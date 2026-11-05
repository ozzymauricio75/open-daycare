import { currentUser, feedPosts, room } from "@/app/_data/feed";
import { CameraIcon } from "@/app/_components/icons";
import { PostCard } from "@/app/_components/post-card";
import { Sidebar } from "@/app/_components/sidebar";

export default function Home() {
  const firstName = currentUser.name.split(" ")[0];

  return (
    <div className="flex min-h-screen min-w-[900px] bg-cream">
      <Sidebar />

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-10 pt-[34px] pb-20">
          <header className="mb-6">
            <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-coral-deep">
              GUARDERÍA · {room.name.toUpperCase()}
            </div>
            <h1 className="font-display text-[30px] font-semibold text-ink">
              Buenas, {firstName}
            </h1>
            <p className="mt-[5px] text-[14.5px] text-muted">
              {room.childrenCount} niños · {room.dateLabel}
            </p>
          </header>

          <a
            href="#"
            className="mb-6 flex items-center gap-[14px] rounded-[18px] border border-line bg-surface px-[18px] py-[14px] shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#F2937A] font-display text-[16px] font-semibold text-white">
              {currentUser.initial}
            </span>
            <span className="flex-1 text-[15px] text-muted-2">
              Compartí un momento…
            </span>
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-coral-soft text-coral">
              <CameraIcon />
            </span>
          </a>

          <div className="mb-[14px] flex items-center gap-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">
              PUBLICADO HOY
            </span>
            <span className="h-px flex-1 bg-[#E7DAC8]" />
          </div>

          <div className="flex flex-col gap-4">
            {feedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
