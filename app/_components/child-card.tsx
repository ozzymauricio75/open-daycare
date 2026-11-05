import Link from "next/link";
import type { Kid } from "@/app/_data/kids";
import { padresSubtitle } from "@/app/_data/kids";
import { ProfileAvatar } from "@/app/_components/profile-avatar";
import { ChevronIcon } from "@/app/_components/icons";

export function ChildCard({ kid, href }: { kid: Kid; href: string }) {
  const padresText = padresSubtitle(kid.padresVinculados);

  return (
    <Link
      href={href}
      className="kid flex items-center gap-[14px] min-w-0 rounded-[18px] border border-line bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition-all duration-150 hover:border-[#F2A78E] hover:-translate-y-[2px]"
    >
      <ProfileAvatar kid={kid} size={48} />
      <div className="flex-1 min-w-0">
        <div className="font-display text-[16px] font-semibold text-ink">
          {kid.nombre}
        </div>
        <div className="text-[13px] text-muted-2">
          {kid.edad} años · {padresText}
        </div>
      </div>
      {kid.badge ? (
        <span
          className="flex-none text-[11px] font-extrabold"
          style={{
            padding: "5px 9px",
            borderRadius: "999px",
            backgroundColor: kid.badge.bg,
            color: kid.badge.textColor,
          }}
        >
          {kid.badge.text}
        </span>
      ) : (
        <ChevronIcon className="text-[#cbb89f]" />
      )}
    </Link>
  );
}
