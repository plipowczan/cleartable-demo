# Reguły projektu — ClearTable PL

> Ten plik czyta agent przy KAŻDEJ sesji. Dwie warstwy:
> 1. **Struktura repo** (poniżej — zostaw, opisuje gdzie co leży)
> 2. **Konstytucja projektu** (sekcja na dole — wygenerujesz ją komendą `/reguly` z `prd.md` + `brand.md`)

## Struktura repozytorium (gdzie szukać kontekstu)

- `context/w1/` — artefakty Week 1: walidacja problemu (BHC, deep analysis, notatki z wywiadów Mom Test)
- `context/w2/` — artefakty Week 2: micro-ICP, positioning, Customer Insights Playbook, atomy komunikacji, Landing Page Brief
- `context/brand.md` — brand reference (HEX-y, fonty, voice & tone). Stosuj w KAŻDYM ekranie.
- `prd.md` — żywy dokument: CO budujemy, JEDEN Core Flow (§3). Wracasz przy każdej decyzji.
- `goals.md` — milestone'y M1–M5 + log decyzji.

Gdy budujesz UI — czytaj `context/brand.md` i stosuj wartości stamtąd. Gdy decydujesz o zakresie — czytaj `prd.md` §3 (Core Flow) i §6 (Out of scope). Nie buduj nic spoza Core Flow.

## Konwencje techniczne (domyślne — nadpisze je `/reguly`)

- Język UI: polski (żadnych angielskich etykiet typu `shares`/`409A` — używaj „udziały", „KRS", PLN)
- Responsywność: od 375px wzwyż
- Każdy widok z danymi: obsłuż stan pusty i stan błędu
- Nie proponuj zmiany stacku ani nowych bibliotek bez pytania

---

<!-- KONSTYTUCJA PROJEKTU — wygeneruj komendą /reguly i wklej poniżej tę linię -->

## Konstytucja projektu

### Czym jest ten projekt

ClearTable PL — aplikacja web dla post-seed CEO polskiej sp. z o.o. ("Zarządca Chaosu"), która zastępuje chaos Exceli jednym źródłem prawdy o strukturze udziałowej. **AI Build Summary (1:1 z PRD):** Zbuduj aplikację web, w której founder loguje się magic linkiem, wprowadza strukturę udziałową swojej sp. z o.o. (wspólnicy + udziały) i generuje bezpieczny read-only link, pod którym inwestor widzi tę samą aktualną strukturę bez zakładania konta. Bez symulacji rund, bez generatora KRS, bez płatności. Musi działać pod publicznym URL.

### Stack (zalockowany — nie zmieniaj)

- Next.js 15.x (App Router, Server Components) + React 19 + TypeScript 5.x
- Tailwind CSS v4 + shadcn/ui + ikony Lucide
- Supabase (Postgres + Auth magic link + Row Level Security); public read-only przez token, bez sesji
- Vercel + Vercel Analytics
- **Nie proponuj zmiany stacku ani dodatkowych bibliotek bez pytania.**

### Brand (stosuj w KAŻDYM ekranie)

- Paleta: Primary `#0F2A4A` (CTA/nagłówki) · Secondary `#1D6FB8` (linki/akcenty) · Background `#F6F8FB` · Surface `#FFFFFF` · Text `#0F1B2D` / muted `#51607A` · Success `#1F8A5B` / Error `#C2362F` · Border `#E2E8F0`
- Fonty (Google): Plus Jakarta Sans (nagłówki 600/700) · Inter (body 400/500/600) · **IBM Plex Mono (500) — obowiązkowo na liczbach udziałów i %**, tabular-nums, wyrównanie do prawej
- UI: rounded-lg 8px, subtelne `shadow-sm`, gęste tabele, **light-only**
- Zakazane: estetyka Excela (szare siatki, Calibri/Arial), gradienty na CTA, angielskie etykiety w UI
- **Każdy nowy ekran/komponent używa tych wartości. Nie wymyślaj własnych kolorów ani fontów.**

### Zakres — twarde granice

**Core Flow (jedyny):** founder buduje cap table (wspólnicy + udziały) → generuje read-only link → inwestor widzi tę samą strukturę bez logowania.

**POZA zakresem (nie buduj):**
1. Symulacja rundy / rozwodnienie
2. Symulator exit / waterfall + liquidation preference
3. Kreator ESOP
4. Generator pliku do KRS
5. Edukacja inline / TIPy / mikro-lekcje (❌ obalona w W1)
6. Logowanie inwestora / role / multi-user edycja
7. Realne płatności / pricing
8. Historia zmian / wersjonowanie / email / import Excela

**Nie dodawaj funkcji spoza Core Flow, nawet jeśli wydają się przydatne. Jeśli czegoś brakuje — zapytaj, nie buduj.**

### Protokół decyzji

- **ZATRZYMAJ SIĘ i zapytaj** przy tych tematach (Open Questions z PRD §7):
  - Monetyzacja: SaaS vs transakcyjny (sprzeczność positioning ↔ LP brief)
  - Read-only link: niewygasający czy chroniony hasłem/wygasający
  - Onboarding danych: ręczne wpisanie vs import Excela
  - Klasy udziałów (uprzywilejowane vs flat)
- Decyzje techniczne w ramach zalockowanego stacku: podejmuj sam.
- Copy i treści: używaj zwalidowanego języka z PRD/brand/atomów — nie generuj własnego marketingu.

### Konwencje

- Język UI: polski. Żadnych angielskich etykiet (`shares`, `409A`) — „udziały", „KRS", „KSH", PLN.
- Responsywność od 375px wzwyż.
- Każdy widok z danymi obsługuje stan pusty (instrukcja + 1 CTA) i stan błędu (czerwony, konkretny komunikat) — bez crasha.
- Liczby udziałów/% zawsze IBM Plex Mono, wyrównane do prawej.
- RLS od początku: founder nigdy nie widzi cudzych cap tables.
