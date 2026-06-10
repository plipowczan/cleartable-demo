\set ON_ERROR_STOP on
\pset pager off

-- ── seed dwóch userów (jako superuser postgres) ────────────────────────────
insert into auth.users (id, email)
values
  ('11111111-1111-1111-1111-111111111111', 'founder-a@example.com'),
  ('22222222-2222-2222-2222-222222222222', 'founder-b@example.com');

-- ── USER A: tworzy cap table + 2 wspólników, udostępnia ────────────────────
begin;
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

  insert into public.cap_tables (id, owner_id, company_name, share_token, is_shared)
  values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          '11111111-1111-1111-1111-111111111111',
          'Acme sp. z o.o.', 'tok_shared_acme', true);

  insert into public.shareholders (cap_table_id, name, type, shares) values
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Jan Kowalski', 'founder', 8000),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Fundusz X',    'vc',      2000);
commit;

-- ── USER B: drugi founder, własna prywatna cap table ───────────────────────
begin;
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

  insert into public.cap_tables (owner_id, company_name, is_shared)
  values ('22222222-2222-2222-2222-222222222222', 'Beta sp. z o.o.', false);
commit;

-- ── PROOF 1: izolacja RLS — USER B nie widzi danych USER A ──────────────────
begin;
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

  \echo '=== PROOF 1: USER B widzi cap_tables (oczekiwane: tylko wlasna Beta) ==='
  select company_name, owner_id from public.cap_tables order by company_name;

  \echo '=== PROOF 1b: USER B liczba OBCYCH wierszy (owner != B) — oczekiwane 0 ==='
  select count(*) as foreign_rows_visible_to_b
  from public.cap_tables
  where owner_id <> '22222222-2222-2222-2222-222222222222';

  \echo '=== PROOF 1c: USER B widzi wspolnikow Acme? — oczekiwane 0 ==='
  select count(*) as acme_shareholders_visible_to_b
  from public.shareholders
  where cap_table_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
commit;

-- ── PROOF 2: ANON read-only po share_token (bez sesji) ─────────────────────
begin;
  set local role anon;
  set local request.jwt.claims = '{"role":"anon"}';

  \echo '=== PROOF 2: ANON czyta udostepniona cap table po share_token — oczekiwane dane ==='
  select company_name, is_shared from public.cap_tables
  where share_token = 'tok_shared_acme';

  \echo '=== PROOF 2b: ANON czyta wspolnikow + runtime % ==='
  select s.name, s.type, s.shares,
         round(100.0 * s.shares / sum(s.shares) over (), 2) as pct
  from public.shareholders s
  join public.cap_tables ct on ct.id = s.cap_table_id
  where ct.share_token = 'tok_shared_acme'
  order by s.shares desc;

  \echo '=== PROOF 2c: ANON NIE widzi nieudostepnionej Beta (is_shared=false) — oczekiwane 0 ==='
  select count(*) as nonshared_visible_to_anon
  from public.cap_tables
  where is_shared = false;
commit;
