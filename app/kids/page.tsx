import { kids } from "@/app/_data/kids";
import { Sidebar } from "@/app/_components/sidebar";
import { KidsPageHeader } from "@/app/_components/kids-page-header";
import { KidsSearch } from "@/app/_components/kids-search";
import { ChildCard } from "@/app/_components/child-card";

export default function KidsPage() {
  return (
    <div className="flex min-h-screen min-w-[900px] bg-cream">
      <Sidebar />

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[880px] px-10 pt-[34px] pb-20">
          <KidsPageHeader />
          <KidsSearch />
          <div className="mb-[14px] flex items-center gap-[12px]">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-muted">
              SALA SOLES
            </span>
            <span className="text-[13px] text-muted-2">8 niños</span>
            <span className="flex-1 h-px bg-[#e7dac8]" />
          </div>
          <div className="grid grid-cols-2 gap-[14px]">
            {kids.map((kid) => (
              <ChildCard key={kid.id} kid={kid} href={`/kids/${kid.slug}`} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
