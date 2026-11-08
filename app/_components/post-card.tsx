import {
  POST_KIND_LABELS,
  type Post,
  type PostKind,
} from "@/app/_data/feed";
import {
  CommentIcon,
  HeartIcon,
  ImageIcon,
  MegaphoneIcon,
} from "@/app/_components/icons";

type PostKindStyle = {
  badge: string;
  dot: string;
  label: string;
  avatar: string;
};

const postKindStyles: Record<PostKind, PostKindStyle> = {
  achievement: {
    badge: "bg-[#CFEBD8]",
    dot: "bg-achievement",
    label: "text-achievement",
    avatar: "bg-[#A9D9E8] text-[#1F7A93] font-display text-[17px] font-semibold",
  },
  activity: {
    badge: "bg-[#C7E7F1]",
    dot: "bg-activity",
    label: "text-activity",
    avatar: "bg-[#A9D9E8] text-[#1F7A93] font-display text-[17px] font-semibold",
  },
  announcement: {
    badge: "bg-[#CCD8F4]",
    dot: "bg-announcement",
    label: "text-announcement",
    avatar: "bg-[#CCD8F4] text-announcement",
  },
  meal: {
    badge: "bg-[#9A7B1E]",
    dot: "bg-[#9A7B1E]",
    label: "text-white",
    avatar: "bg-[#9A7B1E] text-white font-display text-[17px] font-semibold",
  },
  nap: {
    badge: "bg-[#E7DCF6]",
    dot: "bg-[#7B5FC0]",
    label: "text-[#7B5FC0]",
    avatar: "bg-[#E7DCF6] text-[#7B5FC0] font-display text-[17px] font-semibold",
  },
  mood: {
    badge: "bg-[#F9D2DE]",
    dot: "bg-[#C56486]",
    label: "text-[#C56486]",
    avatar: "bg-[#F9D2DE] text-[#C56486] font-display text-[17px] font-semibold",
  },
  photo: {
    badge: "bg-[#FBD8CC]",
    dot: "bg-[#D9684A]",
    label: "text-[#D9684A]",
    avatar: "bg-[#FBD8CC] text-[#D9684A] font-display text-[17px] font-semibold",
  },
};

export function PostCard({ post }: { post: Post }) {
  const style = postKindStyles[post.kind];

  return (
    <article className="rounded-[20px] border border-line bg-surface px-[22px] py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <header className="mb-[14px] flex items-center gap-3">
        <span
          className={`flex h-11 w-11 flex-none items-center justify-center rounded-full ${style.avatar}`}
        >
          {post.kind === "announcement" ? (
            <MegaphoneIcon />
          ) : (
            post.authorInitial
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[16.5px] font-semibold text-ink">
            {post.authorName}
          </div>
          <div className="text-[12.5px] text-muted-2">
            {post.time} · {post.publishedBy}
          </div>
        </div>
        <div
          className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${style.badge}`}
        >
          <span className={`h-2 w-2 rounded-full ${style.dot}`} />
          <span
            className={`text-[12px] font-extrabold tracking-[0.5px] ${style.label}`}
          >
            {POST_KIND_LABELS[post.kind]}
          </span>
        </div>
      </header>

      <div className="mb-[10px] text-[12.5px] text-muted-2">
        {post.audience}
      </div>

      <p className="text-[15.5px] leading-[1.55] text-ink-body">{post.body}</p>

      {post.photo ? (
        <a
          href="#"
          className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] text-[#B0A290]"
        >
          <ImageIcon />
          <span className="text-[13.5px]">{post.photo.label}</span>
        </a>
      ) : null}

      <footer className="mt-4 flex items-center gap-[18px] border-t border-line-soft pt-[14px]">
        <span className="flex items-center gap-[7px] text-[14px] font-bold text-coral">
          <HeartIcon />
          {post.likes}
        </span>
        <a
          href="#"
          className="flex items-center gap-[7px] text-[14px] font-bold text-muted"
        >
          <CommentIcon />
          {post.comments}
        </a>
        <span className="flex-1" />
        <a href="#" className="text-[14px] font-extrabold text-[#C5503A]">
          Editar
        </a>
      </footer>
    </article>
  );
}
