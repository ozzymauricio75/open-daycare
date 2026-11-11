-- Migration: create daycares table (root entity)
-- Spec 06: Tabla daycares en Supabase con seed inicial

create table daycares (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table daycares enable row level security;

create policy "daycares_read_authenticated"
  on daycares for select
  to authenticated
  using (true);

-- Seed: 4 guarderías iniciales, Sala Soles es la raíz (primera fila)
insert into daycares (name) values
  ('Sala Soles'),
  ('Mundo de Colores'),
  ('Pequeños Pasos'),
  ('Arcoíris');
