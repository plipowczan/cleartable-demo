-- ClearTable PL — DOWÓD: zapisy zablokowane przez RLS.
-- Uzupełnia rls_proof.sql (tamten dowodzi izolacji SELECT). Tu: WRITE-denial.
-- Cele: anon nie pisze; founder B nie edytuje cap table foundera A.
-- Uruchom: docker exec -i supabase_db_cleartable-demo psql -U postgres -d postgres < supabase/rls_write_proof.sql
\set ON_ERROR_STOP on
\pset pager off

-- ── seed (jako postgres/superuser — omija RLS) ─────────────────────────────
-- czyść po ewentualnym wcześniejszym przebiegu
delete from public.cap_tables where id in
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');
delete from auth.users where id in
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222');

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'founder-a@example.com'),
  ('22222222-2222-2222-2222-222222222222', 'founder-b@example.com');

insert into public.cap_tables (id, owner_id, company_name, share_token, is_shared) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111111','Acme sp. z o.o.','tok_write_acme', true),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','22222222-2222-2222-2222-222222222222','Beta sp. z o.o.','tok_write_beta', false);

insert into public.shareholders (id, cap_table_id, name, type, shares) values
  ('a0000000-0000-0000-0000-000000000001','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Jan Kowalski','founder', 8000),
  ('a0000000-0000-0000-0000-000000000002','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Fundusz X','vc', 2000);

\echo ''
\echo '======== WRITE-DENIAL PROOFS (PASS = RLS zadziałał) ========'

-- ── W1: ANON nie może INSERT cap_tables ────────────────────────────────────
begin;
  set local role anon;
  set local request.jwt.claims = '{"role":"anon"}';
  do $$ begin
    insert into public.cap_tables (owner_id, company_name)
      values ('11111111-1111-1111-1111-111111111111','anon-hack');
    raise notice 'W1 anon INSERT cap_tables: WSTAWIONO => FAIL';
  exception when others then
    raise notice 'W1 anon INSERT cap_tables: zablokowane => PASS';
  end $$;
rollback;

-- ── W2: ANON nie może UPDATE cap_tables (np. odwrócić odwołania) ────────────
begin;
  set local role anon;
  set local request.jwt.claims = '{"role":"anon"}';
  do $$ declare n int; begin
    update public.cap_tables set is_shared = true
      where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
    get diagnostics n = row_count;
    raise notice 'W2 anon UPDATE cap_tables: wierszy=% => %', n,
      case when n=0 then 'PASS' else 'FAIL' end;
  end $$;
rollback;

-- ── W3: ANON nie może INSERT shareholders (czytelnik nie dopisuje) ──────────
begin;
  set local role anon;
  set local request.jwt.claims = '{"role":"anon"}';
  do $$ begin
    insert into public.shareholders (cap_table_id, name, type, shares)
      values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Anon Wstrzyk','other', 1);
    raise notice 'W3 anon INSERT shareholders: WSTAWIONO => FAIL';
  exception when others then
    raise notice 'W3 anon INSERT shareholders: zablokowane => PASS';
  end $$;
rollback;

-- ── W4: ANON nie może DELETE shareholders ──────────────────────────────────
begin;
  set local role anon;
  set local request.jwt.claims = '{"role":"anon"}';
  do $$ declare n int; begin
    delete from public.shareholders
      where id = 'a0000000-0000-0000-0000-000000000001';
    get diagnostics n = row_count;
    raise notice 'W4 anon DELETE shareholders: wierszy=% => %', n,
      case when n=0 then 'PASS' else 'FAIL' end;
  end $$;
rollback;

-- ── W5: FOUNDER B nie może UPDATE cap table FOUNDERA A ──────────────────────
begin;
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
  do $$ declare n int; begin
    update public.cap_tables set company_name = 'PRZEJĘTE PRZEZ B'
      where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    get diagnostics n = row_count;
    raise notice 'W5 B UPDATE cap table A: wierszy=% => %', n,
      case when n=0 then 'PASS' else 'FAIL' end;
  end $$;
rollback;

-- ── W6: FOUNDER B nie może DELETE wspólników A ─────────────────────────────
begin;
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
  do $$ declare n int; begin
    delete from public.shareholders
      where cap_table_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    get diagnostics n = row_count;
    raise notice 'W6 B DELETE wspólników A: wierszy=% => %', n,
      case when n=0 then 'PASS' else 'FAIL' end;
  end $$;
rollback;

-- ── W7: FOUNDER B nie może INSERT wspólnika do cap table A ──────────────────
begin;
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
  do $$ begin
    insert into public.shareholders (cap_table_id, name, type, shares)
      values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Podstawiony B','other', 5000);
    raise notice 'W7 B INSERT wspólnika do A: WSTAWIONO => FAIL';
  exception when others then
    raise notice 'W7 B INSERT wspólnika do A: zablokowane => PASS';
  end $$;
rollback;

-- ── Kontrola integralności: dane A nietknięte ──────────────────────────────
\echo '=== Kontrola: cap table A wciąż = Acme, 2 wspólników, 10000 udziałów ==='
select c.company_name, count(s.id) as wspolnicy, coalesce(sum(s.shares),0) as udzialy
from public.cap_tables c
left join public.shareholders s on s.cap_table_id = c.id
where c.id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
group by c.company_name;

-- ── sprzątanie ─────────────────────────────────────────────────────────────
delete from public.cap_tables where id in
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');
delete from auth.users where id in
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222');
\echo '======== KONIEC WRITE-DENIAL PROOFS ========'
