import Link from "next/link";
import { PlusIcon } from "@/app/_components/icons";

export function KidsPageHeader() {
  return (
    <div className="flex items-end justify-between gap-[16px] mb-[22px]">
      <div>
        <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-coral-deep">
          GESTIÓN
        </div>
        <h1 className="font-display text-[30px] font-semibold text-ink">
          Niños
        </h1>
      </div>
      <Link
        href="#"
        className="flex items-center gap-[8px] rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
      >
        <PlusIcon />
        Agregar niño
      </Link>
    </div>
  );
}
