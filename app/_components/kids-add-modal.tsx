"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronIcon } from "@/app/_components/icons";
import { ROOMS } from "@/app/_data/kids";

type FormData = {
  nombre: string;
  fecha: string;
  sala: string;
  alergias: string;
  notas: string;
};

type FieldError = {
  nombre: boolean;
  fecha: boolean;
  sala: boolean;
};

const EMPTY_FORM: FormData = {
  nombre: "",
  fecha: "",
  sala: "",
  alergias: "",
  notas: "",
};

const EMPTY_ERRORS: FieldError = { nombre: false, fecha: false, sala: false };

/**
 * Máscara de entrada tipo dd/mm/aaaa: solo dígitos, inserta barras tras el
 * día y el mes, y corta a 10 caracteres.
 */
function maskFecha(value: string): string {
  const digits = value.replace(/\D/g, "");
  let masked = digits.slice(0, 2);
  if (digits.length > 2) masked += "/" + digits.slice(2, 4);
  if (digits.length > 4) masked += "/" + digits.slice(4, 8);
  return masked.slice(0, 10);
}

/**
 * Valida que la fecha sea real en formato DD/MM/AAAA (rechaza 31/02/2026, etc.).
 */
function isValidFecha(fecha: string): boolean {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) return false;
  const [dia, mes, anio] = fecha.split("/").map(Number);
  const date = new Date(anio, mes - 1, dia);
  return (
    date.getFullYear() === anio &&
    date.getMonth() === mes - 1 &&
    date.getDate() === dia
  );
}

export function KidsAddModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
}) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldError>(EMPTY_ERRORS);
  const [submitting, setSubmitting] = useState(false);

  const handleNombreChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, nombre: e.target.value }));
    },
    []
  );

  const handleFechaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, fecha: maskFecha(e.target.value) }));
    },
    []
  );

  const handleSalaChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, sala: e.target.value }));
    },
    []
  );

  const handleAlergiasChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, alergias: e.target.value }));
    },
    []
  );

  const handleNotasChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, notas: e.target.value }));
    },
    []
  );

  const handleSave = useCallback(() => {
    const nextErrors: FieldError = { nombre: false, fecha: false, sala: false };
    let hasError = false;

    if (!form.nombre.trim()) {
      nextErrors.nombre = true;
      hasError = true;
    }
    if (!form.fecha.trim()) {
      nextErrors.fecha = true;
      hasError = true;
    } else if (!isValidFecha(form.fecha)) {
      nextErrors.fecha = true;
      hasError = true;
    }
    if (!form.sala) {
      nextErrors.sala = true;
      hasError = true;
    }

    setErrors(nextErrors);
    if (hasError) return;

    setSubmitting(true);
    onSave(form);
    setSubmitting(false);
  }, [form, onSave]);

  // Cierre con la tecla Esc
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);



  if (!open) return null;

  return (
    <>
      {/* Backdrop: clic fuera cierra el modal */}
      <div
        className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm animate-backdrop-in"
        onClick={onClose}
      />

      {/* Panel del modal */}
      <div
        className="fixed z-[70] top-[40px] left-1/2 -translate-x-1/2 w-full max-w-[520px] bg-[#fbf4ec] border border-line rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] flex flex-col animate-panel-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-[26px] pt-[20px] pb-[1px] border-b border-line">
          <button
            type="button"
            onClick={onClose}
            className="text-[15px] font-bold text-muted transition hover:text-ink"
          >
            Cancelar
          </button>
          <span className="font-display font-semibold text-[18px] text-ink">
            Agregar niño
          </span>
          <button
            type="button"
            onClick={handleSave}
            disabled={submitting}
            className={`flex items-center gap-[8px] rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)] disabled:opacity-60 disabled:pointer-events-none`}
          >
            Guardar
          </button>
        </div>

        {/* Formulario */}
        <div className="p-[24px] pb-[26px]">
          {/* NOMBRE COMPLETO */}
          <div className="mb-[18px]">
            <label
              className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-[8px] block uppercase"
            >
              NOMBRE COMPLETO
            </label>
            <input
              value={form.nombre}
              onChange={handleNombreChange}
              placeholder="Ej. Martina López"
              className={`w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] ${errors.nombre ? "border-coral-deep" : "border-[#eadfd0]"} bg-white text-ink text-[15px] placeholder-[#b6a99b] focus:border-coral-deep focus:ring-0 outline-none`}
            />
            {errors.nombre && (
              <span className="text-[11px] text-coral-deep mt-[4px] block">
                Este campo es obligatorio
              </span>
            )}
          </div>

          {/* FECHA DE NACIMIENTO y SALA en fila */}
          <div className="grid grid-cols-2 gap-[14px] mb-[18px]">
            <div>
              <label
                className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-[8px] block uppercase"
              >
                FECHA DE NACIMIENTO
              </label>
              <input
                value={form.fecha}
                onChange={handleFechaChange}
                placeholder="dd/mm/aaaa"
                maxLength={10}
                className={`w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] ${errors.fecha ? "border-coral-deep" : "border-[#eadfd0]"} bg-white text-ink text-[15px] placeholder-[#b6a99b] focus:border-coral-deep focus:ring-0 outline-none`}
              />
              {errors.fecha && (
                <span className="text-[11px] text-coral-deep mt-[4px] block">
                  Fecha inválida
                </span>
              )}
            </div>
            <div>
              <label
                className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-[8px] block uppercase"
              >
                SALA
              </label>
              <div className="relative">
                <select
                  value={form.sala}
                  onChange={handleSalaChange}
                  className={`w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] ${errors.sala ? "border-coral-deep" : "border-[#eadfd0]"} bg-white text-ink text-[15px] font-bold appearance-none cursor-pointer focus:border-coral-deep focus:ring-0 outline-none`}
                >
                  <option value="">Seleccionar sala</option>
                  {ROOMS.map((room) => (
                    <option key={room.key} value={room.label}>
                      {room.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-[16px] top-[12px]">
                  <ChevronIcon size={14} className="text-muted-2" />
                </div>
              </div>
              {errors.sala && (
                <span className="text-[11px] text-coral-deep mt-[4px] block">
                  Selecciona una sala
                </span>
              )}
            </div>
          </div>

          {/* ALERGIAS (ETIQUETAS) */}
          <div className="mb-[18px]">
            <label
              className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-[8px] block uppercase"
            >
              ALERGIAS (ETIQUETAS)
            </label>
            <input
              value={form.alergias}
              onChange={handleAlergiasChange}
              placeholder="Ej. Maní, Lactosa"
              className="w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white text-ink text-[15px] placeholder-[#b6a99b] focus:border-coral-deep focus:ring-0 outline-none"
            />
          </div>

          {/* NOTAS MÉDICAS */}
          <div className="mb-[0]">
            <label
              className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-[8px] block uppercase"
            >
              NOTAS MÉDICAS
            </label>
            <textarea
              value={form.notas}
              onChange={handleNotasChange}
              placeholder="Indicaciones, medicación, contactos…"
              style={{ minHeight: 90 }}
              className="w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white text-ink text-[15px] leading-[1.5] resize-vertical placeholder-[#b6a99b] focus:border-coral-deep focus:ring-0 outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}
