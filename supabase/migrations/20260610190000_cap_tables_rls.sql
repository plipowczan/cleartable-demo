-- ClearTable PL — schemat cap table + RLS (PRD §4)
-- Encje: cap_tables, shareholders. User = auth.users (magic link).
-- Bez klas udziałów (flat), bez wersjonowania — twarde granice PRD §6/§7.

-- Typ wspólnika (PRD §4: 'founder' | 'angel' | 'vc' | 'esop' | 'other')
create type public.shareholder_type as enum ('founder', 'angel', 'vc', 'esop', 'other');

-- ── cap_tables ─────────────────────────────────────────────────────────────
create table public.cap_tables (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null references auth.users (id) on delete cascade,
  company_name text not null,
  share_token  text not null unique default replace(gen_random_uuid()::text, '-', ''),
  is_shared    boolean not null default false,
  updated_at   timestamptz not null default now()
);

create index cap_tables_owner_id_idx on public.cap_tables (owner_id);

-- ── shareholders ───────────────────────────────────────────────────────────
create table public.shareholders (
  id           uuid primary key default gen_random_uuid(),
  cap_table_id uuid not null references public.cap_tables (id) on delete cascade,
  name         text not null,
  type         public.shareholder_type not null default 'other',
  shares       bigint not null default 0 check (shares >= 0),
  created_at   timestamptz not null default now()
);

create index shareholders_cap_table_id_idx on public.shareholders (cap_table_id);

-- ── RLS ────────────────────────────────────────────────────────────────────
alter table public.cap_tables   enable row level security;
alter table public.shareholders enable row level security;

-- cap_tables: właściciel ma pełny dostęp tylko do swoich wierszy.
create policy "cap_tables_owner_all"
  on public.cap_tables
  for all
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- cap_tables: anon widzi read-only wiersze udostępnione (filtr po share_token w aplikacji).
create policy "cap_tables_anon_shared_read"
  on public.cap_tables
  for select
  to anon
  using (is_shared = true);

-- shareholders: właściciel ma pełny dostęp do wspólników swoich cap tables.
create policy "shareholders_owner_all"
  on public.shareholders
  for all
  to authenticated
  using (exists (
    select 1 from public.cap_tables ct
    where ct.id = shareholders.cap_table_id
      and ct.owner_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.cap_tables ct
    where ct.id = shareholders.cap_table_id
      and ct.owner_id = auth.uid()
  ));

-- shareholders: anon czyta wspólników należących do udostępnionej cap table.
create policy "shareholders_anon_shared_read"
  on public.shareholders
  for select
  to anon
  using (exists (
    select 1 from public.cap_tables ct
    where ct.id = shareholders.cap_table_id
      and ct.is_shared = true
  ));

-- updated_at: auto-bump przy zmianie cap_tables.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger cap_tables_touch_updated_at
  before update on public.cap_tables
  for each row execute function public.touch_updated_at();
