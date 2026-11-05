import { SearchIcon } from "@/app/_components/icons";

export function KidsSearch() {
  return (
    <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-line bg-surface px-[16px] py-[12px]">
      <SearchIcon className="text-[#b0a290]" />
      <input
        type="text"
        placeholder="Buscar niño…"
        className="flex-1 border-none bg-none text-[15px] text-ink placeholder:text-[#b6a99b]"
      />
    </div>
  );
}
