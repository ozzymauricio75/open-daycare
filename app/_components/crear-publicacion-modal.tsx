"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImageIcon } from "@/app/_components/icons";

type AudienceMember = {
  id: string;
  name: string;
  initial: string;
  avatarBg: string;
  avatarFg: string;
};

const AUDIENCE: AudienceMember[] = [
  { id: "mateo", name: "Mateo", initial: "M", avatarBg: "#A9D9E8", avatarFg: "#1F7A93" },
  { id: "sofia", name: "Sofía", initial: "S", avatarBg: "#F4B8CC", avatarFg: "#C44A7A" },
  { id: "benjamin", name: "Benjamín", initial: "B", avatarBg: "#B9DEC4", avatarFg: "#3E8B62" },
];

type PostType = {
  key: string;
  label: string;
  bg: string;
  color: string;
};

const POST_TYPES: PostType[] = [
  { key: "meal", label: "Comida", bg: "#9A7B1E", color: "#fff" },
  { key: "nap", label: "Siesta", bg: "#E7DCF6", color: "#7B5FC0" },
  { key: "activity", label: "Actividad", bg: "#2E89A6", color: "#fff" },
  { key: "achievement", label: "Logro", bg: "#CFEBD8", color: "#3E9B6C" },
  { key: "mood", label: "Ánimo", bg: "#F9D2DE", color: "#C56486" },
  { key: "photo", label: "Foto", bg: "#FBD8CC", color: "#D9684A" },
  { key: "announcement", label: "Anuncio", bg: "#CCD8F4", color: "#4E72C8" },
];

type Photo = {
  id: string;
  url: string;
  name: string;
};

type FormState = {
  description: string;
  selectedKids: string[];
  selectedType: string;
  allRoom: boolean;
  photos: Photo[];
};

type FieldError = {
  description: boolean;
};

const EMPTY_FORM: FormState = {
  description: "",
  selectedKids: [],
  selectedType: "",
  allRoom: false,
  photos: [],
};

const EMPTY_ERRORS: FieldError = { description: false };

export function CrearPublicacionModal({
  open,
  onClose,
  onPublish,
}: {
  open: boolean;
  onClose: () => void;
  onPublish: (data: FormState) => void;
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldError>(EMPTY_ERRORS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleKid = useCallback(
    (kidId: string) => {
      setForm((prev) => {
        const already = prev.selectedKids.includes(kidId);
        const next = already
          ? prev.selectedKids.filter((id) => id !== kidId)
          : [...prev.selectedKids, kidId];
        return { ...prev, selectedKids: next, allRoom: false };
      });
    },
    []
  );

  const toggleAllRoom = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      allRoom: !prev.allRoom,
      selectedKids: prev.allRoom ? [] : prev.selectedKids,
    }));
  }, []);

  const selectType = useCallback((key: string) => {
    setForm((prev) => ({ ...prev, selectedType: key }));
  }, []);

  const setDescription = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, description: value }));
  }, []);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const imageFiles = files.filter((f) => f.type.startsWith("image/"));
      const newPhotos: Photo[] = imageFiles.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      setForm((prev) => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
      e.target.value = "";
    },
    []
  );

  const removePhoto = useCallback(
    (id: string) => {
      setForm((prev) => {
        const photoToRemove = prev.photos.find((p) => p.id === id);
        if (photoToRemove) {
          URL.revokeObjectURL(photoToRemove.url);
        }
        return { ...prev, photos: prev.photos.filter((p) => p.id !== id) };
      });
    },
    []
  );

  const handlePublish = useCallback(() => {
    const nextErrors: FieldError = { description: false };
    let hasError = false;

    if (!form.description.trim()) {
      nextErrors.description = true;
      hasError = true;
    }

    setErrors(nextErrors);
    if (hasError) return;

    onPublish(form);
  }, [form, onPublish]);

  // Cierre con la tecla Esc
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Revocar URLs de objeto al desmontar
  useEffect(() => {
    return () => {
      form.photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [form.photos]);

  if (!open) return null;

  const isKidSelected = (kidId: string) => form.selectedKids.includes(kidId);
  const isTypeSelected = (key: string) => form.selectedType === key;

  const typeStyles: Record<string, string> = {
    meal: "bg-[#9A7B1E] text-white",
    nap: "bg-[#E7DCF6] text-[#7B5FC0]",
    activity: "bg-[#2E89A6] text-white",
    achievement: "bg-[#CFEBD8] text-[#3E9B6C]",
    mood: "bg-[#F9D2DE] text-[#C56486]",
    photo: "bg-[#FBD8CC] text-[#D9684A]",
    announcement: "bg-[#CCD8F4] text-[#4E72C8]",
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Backdrop: clic fuera cierra el modal */}
      <div
        className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm animate-backdrop-in"
        onClick={onClose}
      />

      {/* Panel del modal */}
      <div
        className="fixed z-[70] top-[40px] left-1/2 -translate-x-1/2 w-full max-w-[580px] bg-[#fbf4ec] border border-[#ece0d0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] flex flex-col animate-panel-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-[26px] pt-[20px] pb-[1px] border-b border-[#ece0d0]">
          <button
            type="button"
            onClick={onClose}
            className="text-[15px] font-bold text-[#94887B] transition hover:text-ink"
          >
            Cancelar
          </button>
          <span className="font-display font-semibold text-[18px] text-[#3F362E]">
            Nueva publicación
          </span>
          <button
            type="button"
            onClick={handlePublish}
            className="text-[15px] font-extrabold text-[#D9583C] transition hover:text-ink"
          >
            Publicar
          </button>
        </div>

        {/* Formulario */}
        <div className="p-[24px] pb-[26px]">
          {/* PARA */}
          <div className="mb-[10px]">
            <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px] uppercase">
              PARA
            </div>
            <div className="flex flex-wrap gap-[9px] mb-[22px]">
              {AUDIENCE.map((kid) => {
                const selected = isKidSelected(kid.id);
                return (
                  <button
                    key={kid.id}
                    type="button"
                    onClick={() => toggleKid(kid.id)}
                    className={`flex items-center gap-[8px] px-[14px] py-[6px] pl-[6px] rounded-[999px] border-[1.5px] font-bold text-[14px] ${
                      selected
                        ? "border-[#3F362E] bg-[#3F362E] text-white"
                        : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
                    }`}
                  >
                    <span
                      className="flex h-[26px] w-[26px] items-center justify-center rounded-full font-display font-semibold text-[13px]"
                      style={{
                        backgroundColor: kid.avatarBg,
                        color: kid.avatarFg,
                      }}
                    >
                      {kid.initial}
                    </span>
                    {kid.name}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={toggleAllRoom}
                className={`px-[16px] py-[6px] rounded-[999px] border-[1.5px] font-bold text-[14px] ${
                  form.allRoom
                    ? "border-[#3F362E] bg-[#3F362E] text-white"
                    : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
                }`}
              >
                Toda la sala
              </button>
            </div>
          </div>

          {/* TIPO */}
          <div className="mb-[10px]">
            <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px] uppercase">
              TIPO
            </div>
            <div className="flex flex-wrap gap-[9px] mb-[22px]">
              {POST_TYPES.map((type) => {
                const selected = isTypeSelected(type.key);
                return (
                  <button
                    key={type.key}
                    type="button"
                    onClick={() => selectType(type.key)}
                    className={`px-[16px] py-[8px] rounded-[999px] border-none font-extrabold text-[13.5px] cursor-pointer ${typeStyles[type.key]} ${
                      selected ? "ring-[2px] ring-[#3F362E]" : ""
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="mb-[10px]">
            <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px] uppercase">
              DESCRIPCIÓN
            </div>
            <textarea
              value={form.description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contá cómo le fue hoy…"
              className={`w-full min-h-[120px] resize-vertical px-[16px] py-[14px] rounded-[14px] border-[1.5px] ${
                errors.description
                  ? "border-[#D9583C]"
                  : "border-[#eadfd0]"
              } bg-white text-[#3F362E] text-[15px] leading-[1.5] placeholder-[#b6a99b] focus:border-[#D9583C] focus:ring-0 outline-none`}
            />
            {errors.description && (
              <span className="text-[11px] text-[#D9583C] mt-[4px] block">
                Este campo es obligatorio
              </span>
            )}
          </div>

          {/* FOTOS */}
          <div className="mb-[10px]">
            <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px] uppercase">
              FOTOS
            </div>
            <div className="flex flex-wrap gap-[12px]">
              {form.photos.length > 0 ? (
                form.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative w-[96px] h-[96px] rounded-[14px] overflow-hidden border border-[#ece0d0] bg-[#f4ece1]"
                    style={{ backgroundImage: `url(${photo.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(photo.id);
                      }}
                      className="absolute top-[2px] right-[2px] w-6 h-6 rounded-full bg-[#3F362E] flex items-center justify-center text-[10px] text-white"
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <div
                  className="w-[96px] h-[96px] rounded-[14px] bg-[#f4ece1] border border-[#ece0d0] flex items-center justify-center"
                >
                  <ImageIcon size={26} className="text-[#cbb89f]" />
                </div>
              )}
              <button
                type="button"
                onClick={openFilePicker}
                className="w-[96px] h-[96px] rounded-[14px] border-[1.5px] border-[#dbcbba] bg-[#f4ece1] flex flex-col items-center justify-center gap-[6px] cursor-pointer text-[#b0a290]"
              >
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C5503A"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="text-[12px]">Agregar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
