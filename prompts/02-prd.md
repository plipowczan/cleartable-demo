# PROMPT_PRD — agent-ready PRD dla 7-dniowego MVP

> **Krok 2 zadania po Spotkaniu 1** (po `brand.md`!). Output: plik `prd.md` — JEDEN dokument, pod który AI zbuduje Twoje MVP bez chaosu.
> Universal — działa w Claude, ChatGPT, Gemini i każdym innym modelu.

## Po co ten krok?

AI bez PRD buduje szybko to, czego się **domyśla** — zamiast tego, co zwalidowałeś w W1/W2. PRD to nie korpo-dokument na 8 stron: to ostry, 2-stronicowy brief, który (1) eksternalizuje Twoją intencję, (2) tnie zakres do jednej ścieżki użytkownika i (3) daje agentowi sprawdzalne kryteria "działa / nie działa".

**Jedna zasada, która decyduje o wszystkim:** 7 dni starczy na **jedną ścieżkę użytkownika zrobioną dobrze ALBO trzy zrobione źle**. Większość pracy nad PRD to odmawianie.

## JAK UŻYWAĆ PROMPTU

1. Skopiuj blok poniżej (od `---PROMPT START---` do `---PROMPT END---`)
2. Wklej do nowego okna rozmowy w dowolnym modelu AI
3. **Podłącz artefakty** — im więcej, tym lepszy PRD (garbage in → garbage out): BHC + notatki z wywiadów (W1), micro-ICP, positioning, Customer Insights Playbook, Landing Page Brief (W2) oraz `brand.md` (krok 1)
4. Model może zadać Ci kilka pytań, zanim wygeneruje dokument — to celowe. Odpowiadaj konkretnie.
5. Wynik zapisz jako `prd.md`. To **żywy dokument** na cały tydzień — wracasz do niego przy każdej decyzji.

---PROMPT START---

[ROLA]
Jesteś doświadczonym product managerem specjalizującym się w MVP budowanych z agentami AI w 7 dni. Twoja supermoc to **cięcie zakresu**: zamieniasz bogate materiały discovery w ostry, 2-stronicowy PRD z dokładnie JEDNĄ ścieżką użytkownika. Jesteś strażnikiem dyscypliny — founder będzie chciał dodać "jeszcze tylko jedną funkcję"; Twoja rola to odmawiać i tłumaczyć dlaczego.

[ZADANIE]
Z dostarczonych materiałów (output Week 1: walidacja problemu; Week 2: GTM/ICP/pozycjonowanie; brand.md) wygeneruj `prd.md` — agent-ready PRD dla MVP budowanego w 7 dni, w dokładnie zdefiniowanej strukturze poniżej.

[KROK 1 — AUDYT WEJŚCIA]
Zanim cokolwiek wygenerujesz, sprawdź czy materiały pokrywają tę checklistę:
1. Mierzalny problem + kto jest zdesperowany (z W1: BHC, wywiady)
2. ICP + dane do 1 persony (z W2: micro-ICP, social listening)
3. Value proposition / pozycjonowanie / kluczowy messaging (z W2)
4. Model monetyzacji (z W2: pricing, unit economics)
5. Brief landing page'a lub link do opublikowanego LP (z W2)
6. Brand: HEX-y, fonty, voice & tone (z brand.md)

Liczy się INFORMACJA, nie pliki — treść może siedzieć w jednym dokumencie albo dziesięciu.

Jeśli dwa dokumenty są ze sobą SPRZECZNE (np. ICP sugeruje SaaS, a LP/pricing model transakcyjny) — wskaż sprzeczność wprost i potraktuj jak lukę: pytanie do mnie z rekomendacją, nie cichy wybór.

⚠️ JEŚLI któraś pozycja nie jest pokryta → NIE generuj od razu i NIE zmyślaj. Zadaj mi pytanie o brakujący element — JEDNO pytanie naraz, z Twoją rekomendacją ("na podstawie tego co widzę, sugerowałbym X, bo..."). Mogę pominąć pytanie — ale wtedy powiedz wprost, że ta sekcja PRD będzie zgadywana i może być nietrafiona.

[KROK 2 — PROPOZYCJA CIĘĆ]
Z materiałów wyłoni się prawdopodobnie kilka możliwych funkcji/modułów. Zanim wygenerujesz PRD:
1. Wskaż JEDEN Core Flow — ścieżkę użytkownika najbliższą zwalidowanej wartości (największy ból z wywiadów × obietnica z LP)
2. Wymień co tniesz i dlaczego (to pójdzie do §6 Out of scope)
3. Poproś o moją akceptację cięcia ZANIM przejdziesz do Kroku 3

[KROK 3 — GENERACJA prd.md]
Dokładnie ta struktura. Każda sekcja maksymalnie pół strony. Sekcja bez treści = "n/d", nie wata. Całość ≤ 2 strony.

# PRD — {NAZWA} (MVP 7 dni)

> **Cel dokumentu:** Spiąć input z Week 1 / Week 2 w wykonalny PRD pod 7-dniowe MVP.
> **Track / Stack:** {Track Tech: Claude Code + Next.js 15 + Supabase + Vercel | Track Builder: Lovable/v0 + Supabase + Vercel}
> **Data:** {YYYY-MM-DD} · **Status:** live dokument (aktualizowany przez cały tydzień)

## §1 — Problem-Solution Fit + Value Proposition
Jeden akapit. Value proposition PRZEPISZ 1:1 z mojego LP / pozycjonowania — NIE reformułuj (copy jest zwalidowane, parafraza wprowadza drift). Na końcu dodaj **AI Build Summary**: jedno zdanie w trybie rozkazującym, dla agenta, np.: "Zbuduj aplikację web, w której [rola] loguje się [metoda], robi [core action] i dostaje [rezultat]. Bez [najważniejsze wykluczenie]. Musi działać pod publicznym URL."

## §2 — ICP + 1 persona
Z W2 (+ Discovery W1). JEDNA persona, nie pięć. Kto i DLACZEGO jest zdesperowany. Max 4-5 zdań.

## §3 — Core Flow (TO jest cały zakres V1)
Dokładnie JEDNA user story end-to-end:
- **Job to Be Done:** "Gdy [sytuacja], chcę [motywacja], żeby [rezultat]."
- **User story:** "Jako [rola] chcę [akcja], żeby [korzyść]."
- **Flow ekranami (tekstowo):** Ekran A (login) → akcja → Ekran B (lista) → klik → Ekran C (detal + akcja Y) → potwierdzenie
- **Acceptance criteria** (binarne pass/fail — "działa poprawnie" to NIE kryterium):
  - [ ] ...
  - [ ] Edge case: [opis]
  - [ ] Error state: [co się dzieje gdy X zawiedzie]

## §4 — Data model (3-5 encji MAX)
Kształt danych Core Flow. Track Tech → interfejsy TypeScript; Track Builder → tabele Supabase opisane słownie (nazwa, pola, typy, relacje). Jeśli encji > 5 → zakres za szeroki, wróć do §3 i tnij.

## §5 — Tech stack lock (Track + wersje)
JEDEN track, konkretne wersje (Next.js 15, nie "latest"). Zmiana tracku w środku tygodnia = restart.
**Brand reference (podsekcja, zawsze):** wklej esencję z brand.md — HEX-y, fonty, 1-2 zdania voice & tone (5-8 linii). PRD musi być samowystarczalny dla agenta. Jeśli brand.md nie istnieje → to pytanie do mnie, nie do zmyślenia.

## §6 — Out of scope (min. 5 rzeczy, które kuszą, ale NIE wchodzą)
Konkretnie: multi-auth, role/permissions, admin panel, realne płatności, powiadomienia email, wyszukiwarka... — chyba że któraś JEST Core Flow. Bez tej sekcji scope creep w dzień 4.

## §7 — Open Questions (agent ma PYTAĆ, nie zgadywać)
Decyzje, których agent nie podejmuje sam: provider oznaczony TBD, treści marketingowe, wszystko poza stack lockiem. Każda pozycja z ownerem.

## §8 — Definition of Done MVP V1 (boolean checklist)
- [ ] Production URL działa publicznie (incognito → core flow przechodzi)
- [ ] Core Flow §3 przechodzi smoke test end-to-end
- [ ] Mobile responsive (≥375px)
- [ ] Vercel Analytics podpięty (1 linijka; reszta analityki = Week 4)
- [ ] [dodatkowe per projekt]

## §9 — Component Inventory (TYLKO gdy §5 = Track Builder; dla Track Tech POMIŃ całkowicie)
Tabela każdego znaczącego elementu UI Core Flow (formularze, karty, modale, przyciski, empty states, error states):
| Komponent | Typ | Opis | Story |
Sekcję OBOWIĄZKOWO zacznij od 2-3 zdań prostym językiem JAK z niej korzystać: buduj w Lovable po jednym komponencie naraz, w kolejności z tabeli — opisz narzędziu pojedynczy wiersz, obejrzyj wynik, dopiero potem następny. Komponent, który nie mapuje się na user story z §3 = niepotrzebny w V1.

[KROK 4 — PO WYGENEROWANIU]
1. Pokaż mi wprost §6 (Out of scope) i §7 (Open Questions) — to dwie sekcje, które najczęściej ratują deadline
2. Przypomnij mi o dwóch następnych krokach: (a) wygenerowanie reguł projektu z tego PRD + brand.md (PROMPT_Reguły projektu, krok 3 zadania), (b) rozbicie Core Flow na 3-5 sekwencyjnych milestone'ów (M1 fundament → M2 dane → M3 core flow UI → M4 edge cases → M5 deploy) — to zrobimy na spotkaniu w środę

[CZEGO NIE ROBISZ — twarde zasady]
- ❌ PRD dłuższe niż 2 strony
- ❌ Core Flow z 2+ user stories ("wszystkie ważne" = żadna dobrze)
- ❌ Reformułowanie value proposition z LP (przepisuj 1:1)
- ❌ Stack "latest" zamiast konkretnych wersji
- ❌ Generowanie z pustych/szczątkowych materiałów bez ostrzeżenia (zgadywanie = generic MVP niepasujący do LP)
- ❌ Data model > 5 encji
- ❌ Upieranie się przy konkretnych nazwach plików — czytasz treść, którą dostarczyłem, w dowolnym układzie

[KONTEKST WEJŚCIOWY]

**Nazwa projektu:**
[WKLEJ TUTAJ]

**Track (jeśli już wybrałeś — Tech / Builder; jeśli nie, napisz "pomóż mi wybrać"):**
[WKLEJ TUTAJ]

**Artefakty Week 1 (BHC / Deep Analysis / notatki z wywiadów Mom Test):**
[WKLEJ TUTAJ lub załącz pliki]

**Artefakty Week 2 (micro-ICP / positioning / Customer Insights Playbook / atomy / Landing Page Brief):**
[WKLEJ TUTAJ lub załącz pliki]

**brand.md (z kroku 1):**
[WKLEJ TUTAJ]

**Link do opublikowanego LP (jeśli masz):**
[WKLEJ TUTAJ albo "BRAK"]

---PROMPT END---

## Po wygenerowaniu — checklist

- [ ] PRD ma ≤ 2 strony
- [ ] §3 ma DOKŁADNIE 1 user story z binarnymi acceptance criteria
- [ ] §6 wymienia min. 5 pokus, które NIE wchodzą
- [ ] §5 zawiera esencję brandu (HEX-y i fonty, nie "kolory z LP")
- [ ] AI Build Summary w §1 brzmi jak rozkaz dla agenta, nie opis marketingowy
- [ ] Zapisane jako `prd.md` — przynieś na środę, na nim budujemy
