export type PostKind =
  | "achievement"
  | "activity"
  | "announcement"
  | "meal"
  | "nap"
  | "mood"
  | "photo";

export type Post = {
  id: string;
  kind: PostKind;
  authorName: string;
  authorInitial?: string;
  time: string;
  publishedBy: string;
  audience: string;
  body: string;
  photo?: { label: string };
  likes: number;
  comments: number;
};

export type CurrentUser = {
  name: string;
  initial: string;
  role: string;
};

export type Room = {
  name: string;
  childrenCount: number;
  dateLabel: string;
};

// Identificador interno en inglés; etiqueta visible en español.
export const POST_KIND_LABELS: Record<PostKind, string> = {
  achievement: "LOGRO",
  activity: "ACTIVIDAD",
  announcement: "ANUNCIO",
  meal: "COMIDA",
  nap: "SIESTA",
  mood: "ÁNIMO",
  photo: "FOTO",
};

export const currentUser: CurrentUser = {
  name: "Caro Giménez",
  initial: "C",
  role: "Maestra · Soles",
};

export const room: Room = {
  name: "Sala Soles",
  childrenCount: 12,
  dateLabel: "martes 17 jun",
};

export const feedPosts: Post[] = [
  {
    id: "mateo-achievement-potty",
    kind: "achievement",
    authorName: "Mateo",
    authorInitial: "M",
    time: "14:20",
    publishedBy: "publicado por vos",
    audience: "Para: familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "mateo-activity-painting",
    kind: "activity",
    authorName: "Mateo",
    authorInitial: "M",
    time: "09:40",
    publishedBy: "publicado por vos",
    audience: "Para: familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: { label: "Foto · pintando con témperas" },
    likes: 5,
    comments: 2,
  },
  {
    id: "general-announcement-park",
    kind: "announcement",
    authorName: "Anuncio general",
    time: "07:50",
    publishedBy: "publicado por vos",
    audience: "Para: toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];
