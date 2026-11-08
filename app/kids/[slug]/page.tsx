import Link from "next/link";
import type { Kid } from "@/app/_data/kids";
import { kids } from "@/app/_data/kids";
import { Sidebar } from "@/app/_components/sidebar";
import { KidProfileClient } from "@/app/_components/kid-profile-client";

export function generateStaticParams() {
  return kids.map((kid) => ({ slug: kid.slug }));
}

export default async function KidProfilePage({
  params,
}: PageProps<"/kids/[slug]">) {
  const { slug } = await params;
  const kid = kids.find((k: Kid) => k.slug === slug);

  if (!kid) {
    return (
      <div className="flex min-h-screen min-w-[900px] bg-cream">
        <Sidebar />
        <main className="h-screen min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[820px] px-10 pt-[34px] pb-20">
            <Link href="/kids" className="text-muted font-bold text-[14px]">
              Volver a Niños
            </Link>
            <p className="mt-[20px] text-ink">Niño no encontrado</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen min-w-[900px] bg-cream">
      <Sidebar />

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <KidProfileClient kid={kid} />
      </main>
    </div>
  );
}
