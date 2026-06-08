# PRD — ClearTable PL (MVP 7 dni)

> **Cel dokumentu:** Spiąć input W1/W2 w wykonalny PRD pod 7-dniowe MVP.
> **Track / Stack:** Track Tech — Claude Code + Next.js 15 + Supabase + Vercel
> **Data:** 2026-06-08 · **Status:** live dokument

## §1 — Problem-Solution Fit + Value Proposition

Post-seed CEO polskiej sp. z o.o. trzyma cap table w prywatnym Excelu/Google Sheets z dziesiątkami wersji; gdy inwestor prosi o aktualną strukturę udziałową przed Serią A, zaczyna się wielodniowa wymiana maili i PDF-ów z prawnikiem i aniołami, a stary arkusz "rozjeżdża się na zaokrągleniach groszowych w KRS". To kosztuje tygodnie, nerwy i grozi statusem red flag w due diligence.

**VP (1:1 z LP, bez reformułowania):** „Koniec z v17_final_final.xlsx przed Serią A. Zamień cap table z pola minowego w single source of truth. Zbudowane pod polską sp. z o.o., KRS i realia ESOP."

**AI Build Summary:** Zbuduj aplikację web, w której founder loguje się magic linkiem, wprowadza strukturę udziałową swojej sp. z o.o. (wspólnicy + udziały) i generuje bezpieczny read-only link, pod którym inwestor widzi tę samą aktualną strukturę bez zakładania konta. Bez symulacji rund, bez generatora KRS, bez płatności. Musi działać pod publicznym URL.

## §2 — ICP + 1 persona

**"Zarządca Chaosu"** — CEO/founder polskiej spółki technologicznej (sp. z o.o.), 12–24 mies. po rundzie seed, z kilkoma aniołami + funduszem pre-seed/seed na cap table, często z fractional CFO. Zdesperowany, bo cap table przestał być "tabelką", a stał się infrastrukturą zaufania: ma wielu interesariuszy z różnymi wersjami prawdy, zbliża się ESOP lub Seria A, a Excel jest politycznie niebezpieczny i kompromitujący. WTP 9/10 — porównuje wartość do narzędzi HR za 300 EUR/mc ("płaciłbym bez mrugnięcia okiem, żeby nie klikać tych pieprzonych maili").

## §3 — Core Flow (cały zakres V1)

- **Job to Be Done:** Gdy inwestor prosi o aktualną i kompletną strukturę udziałową, chcę pokazać mu jedną wiarygodną wersję bez wymiany maili i PDF-ów, żeby nie wyglądać jak amator i nie tracić tygodni.
- **User story:** Jako post-seed CEO chcę wprowadzić strukturę udziałową i wygenerować bezpieczny read-only link, żeby fundusz widział dokładnie to samo co ja — na żywo, bez zakładania konta.
- **Flow ekranami (tekstowo):**
  Ekran A (Dashboard — stan pusty / lista cap tables) → klik „Nowy cap table" → Ekran B (Edytor: nazwa spółki + dodawanie wspólników: imię/nazwa, typ, liczba udziałów; live licznik % i sumy udziałów) → klik „Udostępnij" → Ekran C (modal z wygenerowanym read-only linkiem + kopiuj) → otwarcie linku (incognito, bez logowania) → Ekran D (publiczny widok read-only: nazwa spółki, tabela wspólników z udziałami i %, data aktualizacji).
- **Acceptance criteria** (binarne pass/fail):
  - [ ] Founder loguje się magic linkiem i ląduje na dashboardzie
  - [ ] Founder tworzy cap table, dodaje ≥2 wspólników z liczbą udziałów, widzi auto-liczone %
  - [ ] „Udostępnij" generuje unikalny publiczny URL z tokenem
  - [ ] Read-only link otwarty w incognito (bez sesji) pokazuje aktualną strukturę i NIE pozwala edytować
  - [ ] Edge case: 1 wspólnik = 100%; suma udziałów 0 → widok pusty z komunikatem, nie crash
  - [ ] Error state: nieprawidłowy/odwołany token linku → strona „cap table niedostępny", nie 500
  - [ ] RLS: founder A nie widzi i nie edytuje cap table foundera B

## §4 — Data model (3 encje)

```typescript
interface User {            // Supabase auth.users (magic link)
  id: string;              // uuid
  email: string;
  created_at: string;
}

interface CapTable {
  id: string;              // uuid
  owner_id: string;        // -> User.id (RLS)
  company_name: string;
  share_token: string;     // publiczny token read-only linku (unikalny)
  is_shared: boolean;      // czy link aktywny
  updated_at: string;
}

interface Shareholder {
  id: string;              // uuid
  cap_table_id: string;    // -> CapTable.id (cascade delete)
  name: string;
  type: 'founder' | 'angel' | 'vc' | 'esop' | 'other';
  shares: number;          // liczba udziałów; % liczone w runtime (shares / SUM(shares))
  created_at: string;
}
```

## §5 — Tech stack lock (Track Tech)

- **Framework:** Next.js 15.x (App Router, Server Components) + React 19 + TypeScript 5.x
- **Styling:** Tailwind CSS v4 + shadcn/ui (komponenty bazowe), ikony Lucide
- **Backend/DB:** Supabase (Postgres + Auth magic link + Row Level Security). Public read-only view przez token, bez sesji
- **Hosting:** Vercel + Vercel Analytics (1 linijka)
- ❌ Nie zmieniaj stacku ani nie dodawaj bibliotek bez pytania (§7)

**Brand reference (z brand.md — kierunek: zaufanie/instytucjonalny):**
- Paleta: Primary `#0F2A4A` (CTA/nagłówki) · Secondary `#1D6FB8` (linki/akcenty) · Background `#F6F8FB` · Surface `#FFFFFF` · Text `#0F1B2D` / muted `#51607A` · Success `#1F8A5B` / Error `#C2362F` · Border `#E2E8F0`
- Fonty (Google): Plus Jakarta Sans (nagłówki 600/700) · Inter (body 400/500/600) · **IBM Plex Mono (500) — obowiązkowo na liczbach udziałów i %** (tabular-nums, do prawej)
- UI: rounded-lg 8px, subtelne `shadow-sm`, gęste tabele, **light-only**, każdy widok z danymi obsługuje stan pusty i błąd
- Voice: surowy język klienta, twarde liczby, zero korpomowy i angielskich etykiet (`shares`/`409A`) — używaj „udziały", „KRS", PLN

## §6 — Out of scope (NIE wchodzi do V1)

1. **Symulacja rundy / rozwodnienie** — osobny silnik obliczeniowy; do następnej iteracji
2. **Symulator exit / waterfall + liquidation preference** — najcięższy silnik, ryzyko na 7 dni
3. **Kreator ESOP** — osobny moduł
4. **Generator pliku do KRS** — wymaga twardej walidacji prawnej, ryzykowne w 7 dni
5. **Edukacja inline (TIPy / mikro-lekcje)** — ❌ obalona w W1 (wywiad #4: „nie chcę mikro-lekcji, chcę święty spokój")
6. **Logowanie inwestora / role / multi-user edycja** — read-only link bez konta wystarcza; auth-heavy
7. **Realne płatności / pricing** — patrz sprzeczność modelu w §7
8. **Historia zmian / wersjonowanie, email, import Excela** — kuszące, ale tną czas z Core Flow

## §7 — Open Questions (agent PYTA, nie zgadza)

| Pytanie | Rekomendacja | Owner |
|---|---|---|
| **Monetyzacja: SaaS vs transakcyjny?** ICP/positioning mówi SaaS (WTP 9/10), LP brief mówi pay-per-use ("zero abonamentu"). Sprzeczność. | Beachhead post-seed → SaaS; smoke-test wariantu transakcyjnego osobno. Poza MVP. | Founder |
| Read-only link: niewygasający czy chroniony hasłem/wygasający? (blocker compliance VC) | MVP: token niewygasający + przycisk „odwołaj". Password/expiry = iteracja 2. | Founder |
| Onboarding danych: ręczne wpisanie vs import Excela? (luka z W2) | MVP: tylko ręczne wpisanie. | Founder |
| Klasy udziałów (uprzywilejowane/zwykłe)? | MVP: flat — jedna pula udziałów na wspólnika. | Founder |

## §8 — Definition of Done MVP V1 (boolean)

- [ ] Production URL działa publicznie (incognito → core flow)
- [ ] Core Flow §3 przechodzi smoke test (login → cap table → link → widok read-only)
- [ ] Mobile responsive (≥375px)
- [ ] Vercel Analytics podpięty (1 linijka; reszta analityki = W4)
- [ ] Read-only link otwiera się w incognito BEZ logowania i nie pozwala edytować
- [ ] RLS chroni cap table — founder nie widzi cudzych danych
- [ ] Walidacja udziałów: % liczone poprawnie, suma 0/1 wspólnik nie crashuje

## §9 — Component Inventory

n/d — Track Tech (sekcja tylko dla Track Builder).
