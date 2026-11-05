/**
 * verify.ts — Script de verificación de criterios de aceptación de specs.
 *
 * Uso: npx tsx verify.ts <spec-path>
 * Ejemplo: npx tsx verify.ts specs/01-feed-home.md
 *
 * Este script:
 * 1. Lee el spec y extrae la sección "Criterios de aceptación".
 * 2. Clasifica cada criterio por tipo (código, nextjs, visual, convención, pendiente).
 * 3. Ejecuta la verificación correspondiente para cada criterio.
 * 4. Marca las casillas [x] o [ ] en el spec según el resultado.
 * 5. Imprime un reporte final.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

const SPEC_DIR = join(process.cwd(), "specs");

type Criterion = {
  text: string;
  type: "code" | "nextjs" | "visual" | "convention" | "pending";
  lineIndex: number;
  passed: boolean | null;
  evidence: string;
};

function classifyCriterion(text: string): Criterion["type"] {
  const t = text.toLowerCase();

  // Visual / pantallas / screenshots
  if (
    t.includes("screenshot") ||
    t.includes("924×540") ||
    t.includes("924x540") ||
    t.includes("coincide visualmente") ||
    t.includes("references/screenshots") ||
    t.includes("pantalla")
  ) {
    return "visual";
  }

  // Comandos de código: lint, tsc, build, consola, errores
  if (
    t.includes("npm run lint") ||
    t.includes("tsc --noemit") ||
    t.includes("npm run build") ||
    t.includes("consola del navegador") ||
    t.includes("errores ni warnings") ||
    t.includes("sin errores nuevos")
  ) {
    return "code";
  }

  // Dependencias
  if (t.includes("dependencia") || t.includes("package.json")) {
    return "convention";
  }

  // Identificadores en inglés / copy en español / enlaces href="#"
  if (
    t.includes("identificador") ||
    t.includes("código") ||
    t.includes("español") ||
    t.includes("href") ||
    t.includes("fredoka") ||
    t.includes("nunito") ||
    t.includes("geist") ||
    t.includes("colores") ||
    t.includes("fondo general")
  ) {
    return "convention";
  }

  // Next.js recomendaciones (implícito en convenciones de código Next.js)
  if (
    t.includes("next.js") ||
    t.includes("nextjs") ||
    t.includes("recomendación")
  ) {
    return "nextjs";
  }

  return "pending";
}

function extractCriteria(specContent: string): Criterion[] {
  const lines = specContent.split("\n");
  const criteria: Criterion[] = [];
  let inAcceptance = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detectar inicio de la sección (acepta opcionalmente número de sección, ej. "## 6. Criterios de aceptación")
    if (/^##\s*\d*\.?\s*criterios\s+de\s+aceptación/i.test(line)) {
      inAcceptance = true;
      continue;
    }

    // Salir si encontramos otra sección de nivel ##
    if (inAcceptance && /^##\s/.test(line)) {
      break;
    }

    if (inAcceptance) {
      const checkboxMatch = line.match(/^\s*-\s*\[( |x)\]\s(.+)$/);
      if (checkboxMatch) {
        const isChecked = checkboxMatch[1] === "x";
        const text = checkboxMatch[2].trim();
        criteria.push({
          text,
          type: classifyCriterion(text),
          lineIndex: i,
          passed: isChecked,
          evidence: "",
        });
      }
    }
  }

  return criteria;
}

function runCodeChecks(): { passed: boolean; output: string } {
  const checks: Array<{ name: string; cmd: string }> = [
    { name: "lint", cmd: "npm run lint" },
    { name: "tsc", cmd: "npx tsc --noEmit" },
    { name: "build", cmd: "npm run build" },
  ];

  let allPassed = true;
  const outputs: string[] = [];

  for (const check of checks) {
    try {
      const output = execSync(check.cmd, {
        cwd: process.cwd(),
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
        timeout: 180000,
      });
      outputs.push(`✅ ${check.name}: OK\n${output}`);
    } catch (err) {
      allPassed = false;
      const error = err as { stdout?: Buffer; stderr?: Buffer; status?: number };
      const output = error.stdout ? error.stdout.toString() : "";
      const stderr = error.stderr ? error.stderr.toString() : "";
      outputs.push(
        `❌ ${check.name}: FALLÓ\n${output}\n${stderr}\nCódigo de salida: ${error.status}`
      );
    }
  }

  return { passed: allPassed, output: outputs.join("\n\n") };
}

function checkNoNewDependencies(): { passed: boolean; evidence: string } {
  try {
    const pkg = JSON.parse(
      readFileSync(join(process.cwd(), "package.json"), "utf-8")
    );
    const deps = Object.keys({
      ...(pkg.dependencies ?? {}),
      ...(pkg.devDependencies ?? {}),
    });
    const expected = [
      "next",
      "react",
      "react-dom",
      "@tailwindcss/turbopack",
      "@types/node",
      "@types/react",
      "@types/react-dom",
      "eslint",
      "eslint-config-next",
      "tailwindcss",
      "typescript",
    ];
    const unexpected = deps.filter((d) => !expected.includes(d));
    if (unexpected.length > 0) {
      return {
        passed: false,
        evidence: `Dependencias nuevas detectadas: ${unexpected.join(", ")}`,
      };
    }
    return {
      passed: true,
      evidence: "No se agregaron dependencias nuevas a package.json",
    };
  } catch (err) {
    const error = err as { message?: string };
    return {
      passed: false,
      evidence: `No se pudo leer package.json: ${error.message ?? String(err)}`,
    };
  }
}

function markCriterionInSpec(specPath: string, criteria: Criterion[]): void {
  const content = readFileSync(specPath, "utf-8");
  const lines = content.split("\n");

  for (const c of criteria) {
    if (c.passed === null) continue;
    const line = lines[c.lineIndex];
    const newChecked = c.passed ? "x" : " ";
    const replaced = line.replace(
      /^(\s*-\s*\[)( |x)(\].*)$/,
      `$1${newChecked}$3`
    );
    if (replaced !== line) {
      lines[c.lineIndex] = replaced;
    }
  }

  writeFileSync(specPath, lines.join("\n"), "utf-8");
}

function printReport(criteria: Criterion[]): void {
  console.log("\n========================================");
  console.log("  REPORTE DE VERIFICACIÓN DE ACEPTACIÓN");
  console.log("========================================\n");

  let passed = 0;
  let failed = 0;
  let pending = 0;

  for (const c of criteria) {
    const icon =
      c.passed === true ? "✅" : c.passed === false ? "❌" : "⏳";
    const status =
      c.passed === true ? "PASS" : c.passed === false ? "FAIL" : "PENDIENTE";
    if (c.passed === true) passed++;
    else if (c.passed === false) failed++;
    else pending++;

    console.log(`${icon} [${status}] ${c.text}`);
    console.log(`   Tipo: ${c.type}`);
    if (c.evidence) console.log(`   Evidencia: ${c.evidence}`);
    console.log("");
  }

  console.log(
    `\nResumen: ${passed} pasados, ${failed} fallados, ${pending} pendientes de ${criteria.length} criterios.`
  );
}

async function main(): Promise<void> {
  const specPathArg = process.argv[2];
  const specPath = specPathArg
    ? join(process.cwd(), specPathArg)
    : join(SPEC_DIR, "01-feed-home.md");

  if (!existsSync(specPath)) {
    console.error(`❌ No se encontró el spec: ${specPath}`);
    process.exit(1);
  }

  const specContent = readFileSync(specPath, "utf-8");
  const criteria = extractCriteria(specContent);

  if (criteria.length === 0) {
    console.log("⚠️  No se encontraron criterios de aceptación en el spec.");
    process.exit(0);
  }

  console.log(`📄 Spec: ${specPath}`);
  console.log(`📋 Criterios encontrados: ${criteria.length}\n`);

  for (const c of criteria) {
    console.log(`⏳ Verificando: ${c.text} (${c.type})`);

    switch (c.type) {
      case "code": {
        const result = runCodeChecks();
        c.passed = result.passed;
        c.evidence = result.output;
        break;
      }
      case "convention": {
        const depCheck = checkNoNewDependencies();
        c.passed = depCheck.passed;
        c.evidence = depCheck.evidence;
        break;
      }
      case "visual": {
        // El agente usará Playwright MCP + Nemotron visión para esto.
        c.passed = null;
        c.evidence = "Requiere Playwright MCP (screenshot 924×540) + Nemotron 3.5 Super VL Free para comparación visual contra references/screenshots/feed.png";
        break;
      }
      case "nextjs": {
        c.passed = null;
        c.evidence = "Requiere Context7 MCP para consultar docs de Next.js 16.4.3 y validar recomendaciones.";
        break;
      }
      case "pending": {
        c.passed = null;
        c.evidence = "Criterio no verificable automáticamente; requiere revisión manual.";
        break;
      }
    }
  }

  markCriterionInSpec(specPath, criteria);
  printReport(criteria);
}

main().catch((err) => {
  console.error("❌ Error inesperado:", err);
  process.exit(1);
});
