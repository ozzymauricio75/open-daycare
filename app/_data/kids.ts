export type Padre = {
  nombre: string;
  rol: "Mamá" | "Papá";
  estado: "activa" | "pendiente";
  inicial: string;
  colorAvatar: { bg: string; text: string };
};

export type KidBadge = {
  text: string;
  bg: string;
  textColor: string;
};

export type KidPerfil = {
  fechaNacimiento: string;
  sala: string;
  ingreso: string;
  notaAlergia?: string;
  padres: Padre[];
};

export type Kid = {
  id: string;
  slug: string;
  nombre: string;
  edad: number;
  sala: string;
  inicial: string;
  colorAvatar: { bg: string; text: string };
  padresVinculados: number;
  notaAlergia?: string;
  badge?: KidBadge;
  perfil: KidPerfil;
};

// Identificadores en inglés; copy visible en español.
export const kids: Kid[] = [
  {
    id: "mateo-fernandez",
    slug: "mateo-fernandez",
    nombre: "Mateo Fernández",
    edad: 3,
    sala: "Sala Soles",
    inicial: "M",
    colorAvatar: { bg: "#A9D9E8", text: "#1F7A93" },
    padresVinculados: 2,
    notaAlergia:
      "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    badge: { text: "MANÍ", bg: "#FBD8CC", textColor: "#D9684A" },
    perfil: {
      fechaNacimiento: "12 mar 2022",
      sala: "Soles",
      ingreso: "feb 2025",
      notaAlergia:
        "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
      padres: [
        {
          nombre: "Lucía Fernández",
          rol: "Mamá",
          estado: "activa",
          inicial: "L",
          colorAvatar: { bg: "#C9B6E8", text: "#fff" },
        },
        {
          nombre: "Diego Fernández",
          rol: "Papá",
          estado: "pendiente",
          inicial: "D",
          colorAvatar: { bg: "#A9C7E8", text: "#fff" },
        },
      ],
    },
  },
  {
    id: "sofia-mendez",
    slug: "sofia-mendez",
    nombre: "Sofía Méndez",
    edad: 2,
    sala: "Sala Soles",
    inicial: "S",
    colorAvatar: { bg: "#F4B8CC", text: "#C44A7A" },
    padresVinculados: 1,
    perfil: {
      fechaNacimiento: "20 jun 2024",
      sala: "Soles",
      ingreso: "mar 2025",
      padres: [
        {
          nombre: "Andrea Méndez",
          rol: "Mamá",
          estado: "activa",
          inicial: "A",
          colorAvatar: { bg: "#F4B8CC", text: "#C44A7A" },
        },
      ],
    },
  },
  {
    id: "benjamin-ruiz",
    slug: "benjamin-ruiz",
    nombre: "Benjamín Ruiz",
    edad: 3,
    sala: "Sala Soles",
    inicial: "B",
    colorAvatar: { bg: "#B9DEC4", text: "#3E8B62" },
    padresVinculados: 2,
    perfil: {
      fechaNacimiento: "05 nov 2023",
      sala: "Soles",
      ingreso: "ene 2025",
      padres: [
        {
          nombre: "Carlos Ruiz",
          rol: "Papá",
          estado: "activa",
          inicial: "C",
          colorAvatar: { bg: "#B9DEC4", text: "#3E8B62" },
        },
        {
          nombre: "Elena Ruiz",
          rol: "Mamá",
          estado: "pendiente",
          inicial: "E",
          colorAvatar: { bg: "#A9D9E8", text: "#1F7A93" },
        },
      ],
    },
  },
  {
    id: "valentina-soto",
    slug: "valentina-soto",
    nombre: "Valentina Soto",
    edad: 2,
    sala: "Sala Soles",
    inicial: "V",
    colorAvatar: { bg: "#F4DC8E", text: "#9A7B1E" },
    padresVinculados: 0,
    badge: { text: "VINCULAR", bg: "#F9D2DE", textColor: "#C56486" },
    perfil: {
      fechaNacimiento: "14 sept 2024",
      sala: "Soles",
      ingreso: "abr 2025",
      padres: [],
    },
  },
  {
    id: "tomas-diaz",
    slug: "tomas-diaz",
    nombre: "Tomás Díaz",
    edad: 3,
    sala: "Sala Soles",
    inicial: "T",
    colorAvatar: { bg: "#C9B6E8", text: "#7B5FC0" },
    padresVinculados: 1,
    badge: { text: "LACTOSA", bg: "#FBD8CC", textColor: "#D9684A" },
    perfil: {
      fechaNacimiento: "02 jul 2023",
      sala: "Soles",
      ingreso: "feb 2025",
      padres: [
        {
          nombre: "Carla Díaz",
          rol: "Mamá",
          estado: "activa",
          inicial: "C",
          colorAvatar: { bg: "#C9B6E8", text: "#7B5FC0" },
        },
      ],
    },
  },
  {
    id: "emma-castro",
    slug: "emma-castro",
    nombre: "Emma Castro",
    edad: 2,
    sala: "Sala Soles",
    inicial: "E",
    colorAvatar: { bg: "#F4B8CC", text: "#C44A7A" },
    padresVinculados: 1,
    perfil: {
      fechaNacimiento: "30 ene 2025",
      sala: "Soles",
      ingreso: "sep 2025",
      padres: [
        {
          nombre: "Marina Castro",
          rol: "Mamá",
          estado: "activa",
          inicial: "M",
          colorAvatar: { bg: "#F4B8CC", text: "#C44A7A" },
        },
      ],
    },
  },
  {
    id: "lucas-romero",
    slug: "lucas-romero",
    nombre: "Lucas Romero",
    edad: 3,
    sala: "Sala Soles",
    inicial: "L",
    colorAvatar: { bg: "#A9D9E8", text: "#1F7A93" },
    padresVinculados: 1,
    perfil: {
      fechaNacimiento: "11 abr 2023",
      sala: "Soles",
      ingreso: "mar 2025",
      padres: [
        {
          nombre: "Paula Romero",
          rol: "Mamá",
          estado: "activa",
          inicial: "P",
          colorAvatar: { bg: "#A9D9E8", text: "#1F7A93" },
        },
      ],
    },
  },
  {
    id: "olivia-vega",
    slug: "olivia-vega",
    nombre: "Olivia Vega",
    edad: 2,
    sala: "Sala Soles",
    inicial: "O",
    colorAvatar: { bg: "#B9DEC4", text: "#3E8B62" },
    padresVinculados: 1,
    perfil: {
      fechaNacimiento: "22 dic 2024",
      sala: "Soles",
      ingreso: "oct 2025",
      padres: [
        {
          nombre: "Lucía Vega",
          rol: "Mamá",
          estado: "activa",
          inicial: "L",
          colorAvatar: { bg: "#B9DEC4", text: "#3E8B62" },
        },
      ],
    },
  },
];

export function padresSubtitle(padresVinculados: number): string {
  if (padresVinculados === 0) {
    return "sin padres vinculados";
  }
  return `${padresVinculados} padre${
    padresVinculados > 1 ? "es" : ""
  } vinculado${padresVinculados > 1 ? "s" : ""}`;
}

export type Room = {
  key: string;   // "soles" | "luna" | "mar"
  label: string; // "Soles" | "Luna" | "Mar" (texto visible en el select del modal)
};

export const ROOMS: Room[] = [
  { key: "soles", label: "Soles" },
  { key: "luna", label: "Luna" },
  { key: "mar", label: "Mar" },
];
