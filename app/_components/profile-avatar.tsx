import type { Kid } from "@/app/_data/kids";

export function ProfileAvatar({
  kid,
  size = 84,
}: {
  kid: Kid;
  size?: number;
}) {
  const fontSize = size >= 80 ? 34 : size >= 40 ? 19 : 16;

  return (
    <span
      className="flex flex-none items-center justify-center rounded-full font-display font-semibold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: kid.colorAvatar.bg,
        color: kid.colorAvatar.text,
        fontSize,
      }}
    >
      {kid.inicial}
    </span>
  );
}
