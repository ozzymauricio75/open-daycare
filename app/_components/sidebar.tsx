'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentUser, room } from "@/app/_data/feed";
import {
  BellIcon,
  ChildrenIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  SunIcon,
  UserIcon,
} from "@/app/_components/icons";

const navItems = [
  { label: "Feed", href: "/", icon: HomeIcon },
  { label: "Niños", href: "/kids", icon: ChildrenIcon },
  { label: "Avisos", href: "#", icon: BellIcon },
  { label: "Mi cuenta", href: "#", icon: UserIcon },
];

const navItemStyles =
  "flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px]";

const navStateStyles = {
  active: "bg-coral-soft text-coral-deep font-extrabold",
  inactive: "bg-transparent text-[#6e6359] font-semibold",
};

export function Sidebar() {
  const pathname = usePathname();
  const isKids = pathname.startsWith("/kids");

  return (
    <aside className="sticky top-0 flex h-screen w-[248px] flex-none flex-col border-r border-line bg-surface px-4 py-6">
      <Link href="#" className="flex items-center gap-[11px] px-2 pt-1 pb-[22px]">
        <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl bg-[linear-gradient(155deg,#F8C3A8,#F2937A)] text-white">
          <SunIcon />
        </span>
        <span>
          <span className="block font-display text-[17px] font-semibold leading-none text-ink">
            OpenDayCare
          </span>
          <span className="mt-0.5 block text-[11.5px] text-muted-2">
            {room.name}
          </span>
        </span>
      </Link>

      <Link
        href="#"
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] p-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]"
      >
        <PlusIcon />
        Nueva publicación
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          let active = false;
          if (label === "Feed") {
            active = pathname === "/";
          } else if (label === "Niños") {
            active = isKids;
          }

          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`${navItemStyles} ${
                active ? navStateStyles.active : navStateStyles.inactive
              }`}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-[10px] border-t border-line pt-[14px]">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-[#F2937A] font-display text-[16px] font-semibold text-white">
            {currentUser.initial}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-extrabold text-ink">
              {currentUser.name}
            </div>
            <div className="text-[12px] text-muted-2">{currentUser.role}</div>
          </div>
          <Link
            href="#"
            title="Cerrar sesión"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-cream text-muted"
          >
            <LogoutIcon />
          </Link>
        </div>
      </div>
    </aside>
  );
}
