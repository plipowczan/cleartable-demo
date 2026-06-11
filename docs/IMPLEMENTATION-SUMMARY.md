# Podsumowanie implementacji — ClearTable PL MVP

> Stan na 2026-06-11. Branch `feat/cap-table-core-flow` zmergowany do `main` (fast-forward). MVP wdrożony i udowodniony na produkcji.

## Status: ukończony ✅

Produkcja: **https://cleartable-demo.vercel.app** (Vercel project `annagawlowskarealestates-projects/cleartable-demo`).

Wszystkie 5 milestone'ów (M1→M5 z `goals.md`) zrealizowane. Pełny Core Flow przeszedł smoke test incognito @375px.

## Co zostało zbudowane (mapa na PRD)

### Core Flow §3 — ekrany A→B→C→D
| Ekran | Ścieżka | Stan |
|---|---|---|
| A — Dashboard (lista + stan pusty z CTA) | `app/dashboard/page.tsx` | ✅ |
| B — Edytor cap table (dodaj/edytuj/usuń wspólnika, live %) | `app/dashboard/[id]/page.tsx`, `add-shareholder-form.tsx` | ✅ |
| C — Modal share (generuje token, `is_shared=true`, kopiuj URL) | `app/dashboard/[id]/share-controls.tsx` | ✅ |
| D — Publiczny read-only (`/share/[token]`) | `app/share/[token]/page.tsx` | ✅ |

Server actions: `app/dashboard/actions.ts`. Logika % (metoda największych reszt → suma dokładnie 100,00%): `lib/cap-table.ts`.

### Acceptance criteria §3 — wszystkie pass
- ✅ Magic-link login → dashboard
- ✅ Tworzenie cap table + ≥2 wspólników + auto-liczone %
- ✅ „Udostępnij" generuje unikalny publiczny URL z tokenem
- ✅ Read-only w incognito pokazuje strukturę, brak edycji (asercja: edit buttons = 0)
- ✅ Edge: 1 wspólnik = 100%; suma 0 → widok pusty, brak NaN/crash
- ✅ Error: zły/odwołany token → strona „niedostępny", nie 500
- ✅ RLS: founder A nie widzi/edytuje cap table foundera B (dowód SQL: write-denial)

### Data model §4
Tabele `cap_tables` + `shareholders` zmigrowane na remote: `supabase/migrations/20260610190000_cap_tables_rls.sql`. Typy TS: `lib/supabase/types.ts`. Enum typu wspólnika `founder|angel|vc|esop|other` zgodny z §4.

### Stack §5 — bez odstępstw
Next.js 15 App Router + React 19 + TS 5 + Tailwind v4 + shadcn/ui + Lucide + Supabase (Postgres/Auth/RLS) + Vercel + Vercel Analytics. Stack nie zmieniony, żadnych dodatkowych bibliotek poza zalockowanymi.

### DoD §8 — wszystkie pass
Production URL ✅ · Core Flow smoke test ✅ · responsive ≥375px ✅ · Vercel Analytics (1 linia w `app/layout.tsx`) ✅ · read-only incognito bez logowania ✅ · RLS ✅ · walidacja udziałów (0/1 wspólnik) ✅.

### Open Questions §7 — zastosowano rekomendacje PRD (bez zmiany zakresu)
- Klasy udziałów: **flat** (jedna pula na wspólnika) — zgodnie z rekomendacją.
- Onboarding: **tylko ręczne wpisanie** (bez importu Excela).
- Read-only link: **token niewygasający + „Odwołaj link"** (bez expiry/hasła).
- Monetyzacja: **poza MVP** — nie budowano płatności.

### Out of scope §6 — nic nie zbudowano
Żadna z 8 pozycji (symulacja rundy, exit/waterfall, ESOP, generator KRS, edukacja inline, logowanie inwestora, płatności, historia/import) nie weszła do V1.

## Odstępstwa od PRD

Brak odstępstw zakresowych. Core Flow, data model i stack 1:1 z PRD. Poniżej różnice **wyłącznie operacyjno-techniczne**, bez wpływu na acceptance criteria:

1. **Generowanie `share_token`** — użyto `gen_random_uuid()` zamiast pgcrypto `gen_random_bytes`. Powód: rozszerzenie pgcrypto nie było włączone na zdalnym projekcie (pierwsza migracja padła). Token nadal unikalny i niezgadywalny (UUID v4). PRD §4 wymaga tylko „unikalny" — spełnione.

2. **Supabase Auth — `enable_confirmations=false`** — magic link loguje bezpośrednio (bez kroku potwierdzenia). Efekt uboczny `supabase config push`. Akceptowalne dla demo magic-link; AC „founder loguje się magic linkiem" spełnione.

3. **Side effects config push** — `otp_length=6`, MFA enroll wyłączone. Bez znaczenia dla Core Flow (magic-link, brak OTP/MFA w przepływie).

4. **Limit wysyłki e-maili 2/godz.** na remote (rate limit Supabase) — ograniczenie operacyjne przy re-testach logowania, nie funkcja produktu.

5. **Hosting pod osobnym kontem org** — projekt Vercel pod `annagawlowskarealestates-projects`, Supabase ref `habgxhzewbposrxbztsc` poza organizacją zalogowaną w CLI. Surowe URL-e deploymentu zwracają 401 (Vercel deployment protection) — publiczny dostęp przez alias `cleartable-demo.vercel.app`.

## Dowody (artefakty w repo)
- `scripts/prod_walkthrough.py` — prod end-to-end @375px, login (disposable inbox) → cap table → share → fresh incognito read-only. Zrzuty `screenshots/PROD-A..D-375.png`.
- `scripts/walkthrough.py` — lokalny przepływ A–D, zrzuty `screenshots/A–D`.
- `scripts/edge_proof.py` + `screenshots/E1–E5` — edge/error states.
- `supabase/rls_proof.sql`, `supabase/rls_write_proof.sql` — dowody RLS (read + write denial).
