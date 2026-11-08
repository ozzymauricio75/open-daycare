"use client";

import { useCallback, useEffect, useState } from "react";

type Parentesco = "Mamá" | "Papá" | "Tutor/a";

export function VincularPadreModal({
  kidNombre,
  isOpen,
  onClose,
}: {
  kidNombre: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [parentesco, setParentesco] = useState<Parentesco>("Mamá");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [nombreError, setNombreError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleParentescoChange = useCallback(
    (next: Parentesco) => {
      setParentesco(next);
    },
    []
  );

  const handleNombreChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNombre(e.target.value);
      setNombreError(false);
    },
    []
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setEmailError(false);
    },
    []
  );

  const handleEnviar = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      let hasError = false;
      if (!nombre.trim()) {
        setNombreError(true);
        hasError = true;
      }
      if (!email.trim()) {
        setEmailError(true);
        hasError = true;
      }
      if (hasError) {
        e.preventDefault();
      }
    },
    [nombre, email]
  );

  // Cierre con la tecla Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isSelected = (p: Parentesco) => p === parentesco;

  return (
    <>
      {/* Backdrop: clic fuera cierra el modal */}
      <div
        className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm animate-backdrop-in"
        onClick={onClose}
      />

      {/* Panel del modal */}
      <div
        className="fixed z-[70] top-[40px] left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#fbf4ec] border border-[#ece0d0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] flex flex-col animate-panel-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-[26px] pt-[20px] pb-[1px] border-b border-[#ece0d0]">
          <div>
            <div className="font-display font-semibold text-[18px] text-ink">
              Vincular padre
            </div>
            <div className="mt-[1px] text-[13px] text-muted-2">
              a {kidNombre}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-[34px] h-[34px] rounded-[10px] bg-[#f0e6d8] text-[#94887b] flex items-center justify-center"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-[22px] pb-[26px]">
          {/* Aviso de correo */}
          <div className="flex gap-[11px] bg-[#e3ecfb] p-[13px_16px] mb-[20px] rounded-[14px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4e72c8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flex: "none", marginTop: "1px" }}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <span className="text-[13.5px] text-[#3f5694] leading-[1.45]">
              Le enviaremos un correo con un código para que active su cuenta.
              Solo verá el feed de {kidNombre}.
            </span>
          </div>

          {/* NOMBRE DEL PADRE/MADRE */}
          <div className="mb-[8px]">
            <label
              className="text-[12px] font-extrabold tracking-[0.7px] text-muted-2 mb-[8px] block"
            >
              NOMBRE DEL PADRE/MADRE
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={handleNombreChange}
              placeholder="Ej. Diego Fernández"
              className={`w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] ${nombreError ? "border-coral-deep" : "border-[#eadfd0]"} bg-white text-ink text-[15px] placeholder-[#b6a99b] focus:outline-none outline-none`}
            />
            {nombreError && (
              <span className="text-[11px] text-coral-deep mt-[4px] block">
                Este campo es obligatorio
              </span>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-[18px]">
            <label
              className="text-[12px] font-extrabold tracking-[0.7px] text-muted-2 mb-[8px] block"
            >
              EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
              placeholder="correo@ejemplo.com"
              className={`w-full px-[16px] py-[13px] rounded-[14px] border-[1.5px] ${emailError ? "border-coral-deep" : "border-[#eadfd0]"} bg-white text-ink text-[15px] placeholder-[#b6a99b] focus:outline-none outline-none`}
            />
            {emailError && (
              <span className="text-[11px] text-coral-deep mt-[4px] block">
                Este campo es obligatorio
              </span>
            )}
          </div>

          {/* PARENTESCO */}
          <div className="mb-[10px]">
            <label
              className="text-[12px] font-extrabold tracking-[0.7px] text-muted-2 mb-[8px] block"
            >
              PARENTESCO
            </label>
            <div className="flex gap-[9px]">
              {[ "Mamá", "Papá", "Tutor/a" ].map((p) => {
                const selected = isSelected(p as Parentesco);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleParentescoChange(p as Parentesco)}
                    className={`flex-1 px-0 py-[11px] rounded-[999px] font-extrabold text-[14px] cursor-pointer transition ${
                      selected
                        ? "border-[1.5px] border-[#9fb8ec] bg-[#ccd8f4] text-[#4e72c8]"
                        : "border-[1.5px] border-[#ece0d0] bg-[#fffdf9] text-[#6e6359]"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Código de invitación */}
          <div
            className="bg-[#fbf1d6] border-[1.5px] border-[#e6d08a] border-dashed rounded-[16px] p-[18px] text-center mb-[20px]"
          >
            <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#a88526] mb-[8px]">
              CÓDIGO DE INVITACIÓN
            </div>
            <div className="font-display font-semibold text-[34px] tracking-[7px] text-[#8a7234]">
              7K4P9
            </div>
            <div className="mt-[6px] text-[13px] text-[#a88526]">
              Vence en 7 días
            </div>
          </div>

          {/* CTA Enviar invitación */}
          <a
            href="#"
            onClick={handleEnviar}
            className="flex items-center justify-center gap-[9px] w-full px-0 py-[14px] rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] text-[#fff] font-extrabold text-[15.5px] shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)]"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m22 2-7 20-4-9-9-4z" />
              <path d="M22 2 11 13" />
            </svg>
            Enviar invitación
          </a>
        </div>
      </div>
    </>
  );
}
