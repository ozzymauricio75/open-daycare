"use client";

import Link from "next/link";
import type { Kid } from "@/app/_data/kids";
import { ProfileAvatar } from "@/app/_components/profile-avatar";
import { VincularPadreModal } from "@/app/_components/vincular-padre-modal";
import { useState } from "react";

export function KidProfileClient({ kid }: { kid: Kid }) {
  const [isVincularOpen, setIsVincularOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[820px] px-10 pt-[34px] pb-20">
      <Link
        href="/kids"
        className="flex items-center gap-[7px] mb-[20px] text-muted font-bold text-[14px]"
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
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver a Niños
      </Link>

      <div className="flex gap-[26px] items-start flex-wrap">
        <div className="flex-1 min-w-[300px] flex flex-col gap-[18px]">
          <div className="flex items-center gap-[18px]">
            <ProfileAvatar kid={kid} size={84} />
            <div className="flex-1">
              <h1 className="font-display text-[28px] font-semibold text-ink">
                {kid.nombre}
              </h1>
              <p className="mt-[3px] text-[15px] text-muted">
                {kid.edad} años · {kid.sala}
              </p>
            </div>
            <Link
              href="#"
              className="border border-[1.5px] border-line bg-surface text-[#6e6359] font-bold text-[14px] px-[16px] py-[9px] rounded-[12px]"
            >
              Editar
            </Link>
          </div>

          {kid.notaAlergia ? (
            <div className="rounded-[16px] bg-[#fbdad6] px-[18px] py-[16px]">
              <div className="flex gap-[14px]">
                <div className="flex-none w-[40px] h-[40px] rounded-[11px] bg-[#f4a8a0] flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                    <path d="M12 9v4M12 17h.01" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[15px] text-[#c5413a] mb-1">
                    Alergias y notas
                  </div>
                  <div className="text-[#b25249] text-[14.5px] leading-[1.5]">
                    {kid.notaAlergia}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="rounded-[16px] border border-line bg-surface overflow-hidden">
            <div className="flex justify-between px-[18px] py-[15px] border-b border-line-soft">
              <span className="text-[14.5px] text-muted">
                Fecha de nacimiento
              </span>
              <span className="font-extrabold text-[14.5px] text-ink">
                {kid.perfil.fechaNacimiento}
              </span>
            </div>
            <div className="flex justify-between px-[18px] py-[15px] border-b border-line-soft">
              <span className="text-[14.5px] text-muted">Sala</span>
              <span className="font-extrabold text-[14.5px] text-ink">
                {kid.perfil.sala}
              </span>
            </div>
            <div className="flex justify-between px-[18px] py-[15px]">
              <span className="text-[14.5px] text-muted">Ingreso</span>
              <span className="font-extrabold text-[14.5px] text-ink">
                {kid.perfil.ingreso}
              </span>
            </div>
          </div>
        </div>

        <div className="w-[300px] flex-none flex flex-col gap-[14px]">
          <Link
            href="#"
            className="flex items-center justify-center gap-[9px] rounded-[14px] bg-ink p-[13px] text-[15px] font-extrabold text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            Resumen del día
          </Link>
          <div className="rounded-[16px] border border-line bg-surface p-[16px]">
            <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8a7c6d] mb-[14px]">
              Padres vinculados
            </div>
            <div className="flex flex-col gap-[14px]">
              {kid.perfil.padres.map((padre) => (
                <div
                  key={padre.nombre}
                  className="flex items-center gap-[12px]"
                >
                  <div
                    className="flex-none w-[40px] h-[40px] rounded-full font-display font-semibold text-white flex items-center justify-center"
                    style={{
                      backgroundColor: padre.colorAvatar.bg,
                      color: padre.colorAvatar.text,
                      fontSize: 16,
                    }}
                  >
                    {padre.inicial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-[14.5px] text-ink">
                      {padre.nombre}
                    </div>
                    <div className="text-[12.5px] text-muted-2">
                      {padre.rol} ·{" "}
                      {padre.estado === "activa"
                        ? "activa"
                        : "invitación enviada"}
                    </div>
                  </div>
                  <span
                    className="flex-none text-[10.5px] font-extrabold rounded-[999px] px-[9px] py-[4px]"
                    style={{
                      backgroundColor:
                        padre.estado === "activa" ? "#cfebd8" : "#f7e7a6",
                      color:
                        padre.estado === "activa" ? "#3e9b6c" : "#9a7b1e",
                    }}
                  >
                    {padre.estado === "activa" ? "ACTIVA" : "PENDIENTE"}
                  </span>
                </div>
              ))}
              {kid.perfil.padres.length === 0 && (
                <p className="text-[13px] text-muted-2">
                  Sin padres vinculados aún.
                </p>
              )}
              <button
                type="button"
                onClick={() => setIsVincularOpen(true)}
                className="flex items-center gap-[12px] pt-[8px] text-[14.5px] font-extrabold text-[#c5503a]"
              >
                <span
                  className="flex-none w-[40px] h-[40px] rounded-full border border-[1.5px] border-[#d8cbba] flex items-center justify-center text-[#b0a290]"
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
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                Vincular otro padre
              </button>
            </div>
          </div>
        </div>
      </div>

      {isVincularOpen && (
        <VincularPadreModal
          kidNombre={kid.nombre}
          isOpen={isVincularOpen}
          onClose={() => setIsVincularOpen(false)}
        />
      )}
    </div>
  );
}
