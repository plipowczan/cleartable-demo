# goals.md — ClearTable PL

> Dekompozycja Core Flow (`prd.md` §3) na M1–M5. Track Tech. Kolejność absolutna: fundament → dane → UI → integracja → deploy. Każdy milestone sprawdzalny binarnie ZANIM ruszy następny.
> ⚠️ Bounds = koszt, nie limit. Pełny Next.js+Supabase ~360–450 tur. Deploy zaniżany najczęściej.

## Milestone'y

## M1 — Fundament
- **Capability:** Szkielet Next.js + brand + magic link auth działa pod preview URL; niezalogowany nie wejdzie na dashboard.
- **Pokrywa z Core Flow §3:** szkielet pod wszystkie ekrany A–D + AC „founder loguje się magic linkiem i ląduje na dashboardzie".
- **Definition of Done (binarne):**
  - [ ] `npm run build` przechodzi; projekt na Next.js 15 App Router + React 19 + TS + Tailwind v4 + shadcn/ui
  - [ ] Tokeny brandu skonfigurowane: kolory (`#0F2A4A`, `#1D6FB8`, `#F6F8FB`…), fonty Plus Jakarta Sans / Inter / IBM Plex Mono załadowane
  - [ ] Supabase client podpięty; logowanie magic link wysyła email i tworzy sesję
  - [ ] `/dashboard` za auth gate: niezalogowany → redirect na `/login`
  - [ ] Preview deploy na Vercel zwraca 200 pod publicznym URL
- **Bound:** 80–100 tur
- **Bramki decyzyjne:** brak (fundament).

```
/goal Next.js 15 app deploys to a Vercel preview URL returning 200, with brand tokens (colors + Plus Jakarta Sans/Inter/IBM Plex Mono) configured and Supabase magic-link auth gating /dashboard so logged-out users redirect to /login; you prove this by npm run build passing, the preview URL, and an incognito visit to /dashboard redirecting; do not add features beyond auth shell, do not change the locked stack; or stop after 100 turns
```

## M2 — Dane
- **Capability:** Encje §4 żyją w Supabase z RLS; founder czyta/zapisuje tylko swoje cap tables, publiczny token czyta read-only bez sesji.
- **Pokrywa z Core Flow §3:** fundament danych pod B/C/D + AC „RLS: founder A nie widzi cap table foundera B".
- **Definition of Done (binarne):**
  - [ ] Tabele `cap_tables` (owner_id, company_name, share_token unikalny, is_shared, updated_at) i `shareholders` (cap_table_id cascade, name, type enum, shares, created_at)
  - [ ] Typy TS (`CapTable`, `Shareholder`) zgodne z §4
  - [ ] RLS: SELECT/INSERT/UPDATE/DELETE tylko dla `owner_id = auth.uid()`
  - [ ] Osobna polityka: anon SELECT cap_table + shareholders WHERE `share_token` match AND `is_shared = true`
  - [ ] Test SQL: drugi user nie zwraca cudzych wierszy; zapytanie po tokenie zwraca dane bez sesji
- **Bound:** 80–100 tur
- **Bramki decyzyjne:** klasy udziałów (§7) — domyślnie flat `shares:number`; **zapytaj** zanim dodasz klasy/uprzywilejowanie.

```
/goal Supabase has cap_tables and shareholders tables matching prd.md §4 with RLS so owners access only their rows and an anon policy exposes read-only rows by share_token when is_shared=true, plus matching TS types; you prove this by the migration SQL, a query as a second user returning zero foreign rows, and an anon token query returning data; keep schema to exactly these entities, do not add share classes without asking; or stop after 100 turns
```

## M3 — Core Flow UI
- **Capability:** Ekrany A→B→C→D renderują się z brandem; founder buduje cap table z auto-liczonymi % i widzi publiczny widok.
- **Pokrywa z Core Flow §3:** ekrany A (Dashboard), B (Edytor + live %), C (modal link), D (publiczny read-only) + AC tworzenia, auto-%, generowania URL.
- **Definition of Done (binarne):**
  - [ ] A: `/dashboard` listuje cap tables usera + stan pusty z CTA „Nowy cap table"
  - [ ] B: `/cap-table/[id]` — dodaj/edytuj/usuń wspólnika (imię, typ, udziały); % i suma liczone na żywo, liczby w IBM Plex Mono do prawej
  - [ ] C: „Udostępnij" generuje `share_token`, ustawia `is_shared=true`, pokazuje modal z URL + kopiuj
  - [ ] D: `/share/[token]` renderuje nazwę spółki + tabelę wspólników z % + data aktualizacji
  - [ ] Wszystkie 4 ekrany zgodne z brand.md (light-only, rounded-lg 8px, polskie etykiety)
- **Bound:** 100–120 tur
- **Bramki decyzyjne:** onboarding import Excela (§7) — MVP tylko ręczne wpisanie; **zapytaj** zanim zrobisz import.

```
/goal Screens A dashboard, B cap-table editor with live-computed %, C share modal with generated read-only URL, and D public /share/[token] view all render per brand.md (light-only, IBM Plex Mono numbers, Polish labels); you prove this by walking login→create→add 2 shareholders→share→open token URL and screenshots of each screen; build only manual entry (no Excel import), follow brand tokens exactly, stay within Core Flow; or stop after 120 turns
```

## M4 — Integracja + edge cases
- **Capability:** Read-only naprawdę read-only, walidacja i stany puste/błędu nie crashują, RLS wymuszony end-to-end.
- **Pokrywa z Core Flow §3:** AC edge (1 wspólnik=100%, suma 0 → pusto), error (zły/odwołany token → strona „niedostępny"), read-only enforcement, RLS.
- **Definition of Done (binarne):**
  - [ ] 1 wspólnik = 100%; suma udziałów 0 → widok pusty z komunikatem, brak crasha/NaN
  - [ ] `/share/[token]` w incognito (bez sesji) pokazuje dane i NIE ma żadnej akcji edycji
  - [ ] Nieprawidłowy lub odwołany token (`is_shared=false`) → strona „cap table niedostępny", nie 500
  - [ ] Przycisk „Odwołaj link" wyłącza dostęp publiczny
  - [ ] Próba edycji cudzego `/cap-table/[id]` → 403/redirect, nie render
- **Bound:** 60–80 tur
- **Bramki decyzyjne:** link expiry/hasło (§7) — MVP token niewygasający + „odwołaj"; **zapytaj** zanim dodasz wygasanie/hasło.

```
/goal Edge and error states hold: 1 shareholder=100%, zero total shows empty-state not NaN, invalid/revoked token renders a "niedostępny" page not 500, incognito /share view is strictly read-only, revoke disables access, and editing another user's cap table is blocked; you prove this by incognito runs of each case and the revoked-token page; keep link as non-expiring token plus revoke, do not add password/expiry without asking; or stop after 80 turns
```

## M5 — Deploy
- **Capability:** Produkcyjny publiczny URL przechodzi smoke test Core Flow na mobile, z Vercel Analytics.
- **Pokrywa z Core Flow §3:** całość end-to-end + DoD §8 prd.md.
- **Definition of Done (binarne):**
  - [ ] Production URL działa publicznie; incognito przechodzi pełny Core Flow (login → cap table → link → widok read-only)
  - [ ] Mobile responsive ≥375px na wszystkich 4 ekranach
  - [ ] Vercel Analytics podpięty (1 linijka; reszta analityki = W4)
  - [ ] Zmienne środowiskowe Supabase ustawione w Vercel (prod)
  - [ ] Read-only link z prod otwiera się w incognito bez logowania
- **Bound:** 40–60 tur (deploy zaniżany — nie tnij)
- **Bramki decyzyjne:** monetyzacja SaaS vs transakcyjny (§7) — POZA MVP; **nie buduj płatności**, eskaluj do foundera.

```
/goal The production Vercel URL passes a full incognito smoke test of the Core Flow (magic-link login → build cap table → share → open read-only token URL) and is responsive at 375px on all four screens with Vercel Analytics wired; you prove this by the production URL, an incognito walkthrough, and a 375px screenshot; do not build payments or any out-of-scope feature, analytics is one line only; or stop after 60 turns
```

## Podsumowanie audytu
- [x] 5 milestone'ów: M1 fundament → M5 deploy
- [x] Każdy fragment §3 przypisany: A/B/C/D + auth → M1/M3; dane+RLS → M2; edge/error/read-only → M4; e2e+mobile → M5
- [x] Każdy milestone: binarne DoD + bound + `/goal`
- [x] Bramki §7 rozłożone: klasy udziałów→M2, import→M3, expiry/hasło→M4, monetyzacja→M5

## Log decyzji

Dopisuj 1 linię na sesję. Format: `[data] M{N}: decyzja — dlaczego (odwołanie do §X prd.md)`.

- [2026-06-08] Setup: Core Flow = single source of truth + share (nie symulator); Track Tech — wybór foundera (prd.md §3/§5)
- ...
