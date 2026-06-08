# 7-Day MVP Playbook — AI Startup Builders #2, Week 3

> **Autor:** Paweł Lipowczan (PLSoft) · **Wersja:** 1.0 dla kohorty SB#2 (czerwiec 2026)
> **Cel tygodnia:** Twoja wizja jako **działająca aplikacja pod publicznym URL-em** — gotowa na ruch z landing page'a (W2) i analitykę produktową (W4).
> Playbook przetestowany end-to-end na pilotażu (MentorMatch — zob. ostatnia sekcja: realne czasy i koszty).

---

## Jedna zasada, która decyduje o wszystkim

**7 dni starczy na jedną ścieżkę użytkownika zrobioną dobrze ALBO trzy zrobione źle.**

Wszystko w tym playbooku służy jednemu: dowieźć JEDEN core flow end-to-end, pod publicznym URL-em, wyglądający spójnie z Twoim landing page'em. Każda faza ma mierzalny output i checklist "zrobione / niezrobione". Bez outputu nie przechodzisz dalej.

## Mapa tygodnia

```
Faza 0: Input lock + brand.md      →  pon→śr (zadanie po Spotkaniu 1, KROK 1)
Faza 1: PRD                        →  pon→śr (zadanie po Spotkaniu 1, KROK 2)
Faza 2: Track lock + reguły        →  decyzja: poniedziałek · reguły: pon→śr (KROK 3, ~10 min)
Faza 3: Milestones M1–M5           →  środa (Spotkanie 2)
Faza 4: Build                      →  środa → sobota
Faza 5: Deploy + analytics         →  sobota → niedziela (handoff do Week 4)
```

| Faza | Output                                                       | Deadline            |
| ---- | ------------------------------------------------------------ | ------------------- |
| 0    | Artefakty W1/W2 w jednym miejscu, konta założone, `brand.md` | środa (Spotkanie 2) |
| 1    | `prd.md` — 2 strony, 1 core flow                             | środa (Spotkanie 2) |
| 2    | Track zalockowany w `prd.md` §5 + reguły projektu w narzędziu | środa (Spotkanie 2) |
| 3    | Lista milestone'ów M1–M5                                     | środa               |
| 4    | Każdy milestone działa w preview, zanim ruszy następny       | sobota              |
| 5    | Publiczny URL + smoke test + handoff                         | niedziela           |

Pliki, które prowadzisz przez tydzień (w repo / folderze projektu):

- `prd.md` — żywy dokument, wracasz przy każdej decyzji
- `brand.md` — wklejasz do każdego promptu UI
- reguły projektu — `CLAUDE.md`/`AGENTS.md` (Tech) lub Lovable Knowledge (Builder); konstytucja czytana w każdej sesji
- `goals.md` — lista milestone'ów + log decyzji
- `README.md` — URL deploya + status

---

## Faza 0 — Input lock + brand (pon→śr)

**Cel:** zacząć build z pełnym kontekstem z W1/W2, nie tracić pierwszego dnia na szukanie tego, co już masz.

### Kroki

1. **Zbierz artefakty W1/W2 w jedno miejsce.**

   **Track Tech — rekomendowany start: szablon repo.** Wejdź na [github.com/plipowczan/vb-mvp-template](https://github.com/plipowczan/vb-mvp-template) → **"Use this template" → Create a new repository**. Dostajesz gotową strukturę (`context/w1/`, `context/w2/`, miejsca na `brand.md`/`prd.md`/`goals.md`) **plus 4 prompty jako komendy** `/brand` `/prd` `/reguly` `/milestones` (czytają pliki repo — nie kopiujesz bloków). Artefakty wrzucasz do `context/w1/` i `context/w2/`.

   **Track Builder — szablon opcjonalnie**, jako magazyn kontekstu: ten sam repo trzyma Twoje artefakty + (jeśli włączysz GitHub sync w Lovable) log decyzji. Nie musisz — wystarczy folder/dokument. Prompty bierzesz z materiałów W3 (Google Doc) i wklejasz do narzędzia.

   Co zebrać (niezależnie od ścieżki):
   - W1: Business Hypothesis Canvas + Deep Analysis + notatki z wywiadów (Mom Test)
   - W2: micro-ICP, positioning, Customer Insights Playbook, atomy komunikacji, **Landing Page Brief**
   - Link do opublikowanego LP, jeśli masz
2. **Załóż konta** (darmowe tiery wystarczą na start):
   - **Track Builder:** Lovable (lub v0) + Vercel **+ Supabase (jeśli potrzebujesz bazy — patrz niżej)**
   - **Track Tech:** GitHub + Vercel + Claude Code (subskrypcja Claude lub Anthropic API) **+ Supabase (jeśli potrzebujesz bazy)**
   - Zaloguj się raz do każdego i sprawdź, że działa — odkrycie zepsutego dostępu w czwartek kosztuje pół dnia

   **Czy potrzebujesz Supabase?** Pytanie kontrolne: **czy ktoś (poza Tobą) tworzy lub zapisuje dane, które muszą przetrwać odświeżenie strony?**
   - **TAK** (konta userów, rezerwacje, zapisane treści, lista rosnąca w czasie) → Supabase. Większość marketplace'ów / SaaS / CRUD.
   - **NIE** → pomijasz bazę i milestone M2 (Dane). Klasy bez bazy: kalkulator/narzędzie liczące, AI-wrapper (tylko API modelu, brak persystencji), landing + formularz do zewnętrznego serwisu (Tally/Airtable/Sheets), treść statyczna, projekt sprzętowy gdzie MVP = dashboard/symulacja.
   - **Nie wiesz?** Zerknij w §4 swojego `prd.md` (Data model) — jeśli jest pusty lub trywialny, baza prawdopodobnie zbędna. Decyzja jest odwracalna w górę (dodanie bazy później tańsze niż wyrzucanie).
3. **Stwórz `brand.md`** — użyj **PROMPT_Brand Reference** (dostarczony w materiałach W3). *(Track Tech z szablonu: po prostu `/brand` w Claude Code.)*
   - **Ścieżka A** — masz opublikowany LP: prompt wyekstrahuje kolory, fonty i ton z tego, co już zwalidowałeś
   - **Ścieżka B** — nie masz LP/brandu: prompt zaprojektuje brand od zera z Twojego ICP i pozycjonowania (wybierzesz 1 z 2 zaproponowanych kierunków)
4. **(Track Tech, opcjonalnie)** Zainstaluj shared-skills — publiczne repo [200iqlabs/shared-skills](https://github.com/200iqlabs/shared-skills). *(Jeśli zacząłeś z szablonu, komendy `/brand` `/prd` `/reguly` `/milestones` już masz — shared-skills dokłada pełne skille `prd` i `/prepare-goal` jako mocniejszy wariant.)* W sesji Claude Code w repo projektu:
   ```
   /plugin marketplace add 200iqlabs/shared-skills
   /plugin install 200iqlabs-agent-skills
   ```
   Dostajesz m.in. `/prepare-goal` (Faza 4) i skill `prd` (Faza 1 — zamiast uniwersalnego promptu). Sprawdź od razu: wpisz `/prepare-goal` i zobacz, czy się uruchamia.
5. **(Track Tech, rekomendowane)** Zainstaluj skill designowy [impeccable](https://github.com/pbakaus/impeccable) (open-source, 35k ⭐) — w katalogu projektu:
   ```
   npx impeccable skills install
   ```
   (alternatywnie w Claude Code: `/plugin marketplace add pbakaus/impeccable`). Dostajesz 23 komendy designowe — użyjemy `shape` (Faza 2), `polish` i `audit` (Fazy 4-5). Sprawdź: wpisz `/impeccable` i zobacz, czy odpowiada.

### Supabase — konwencja kluczy (2025+)

W ustawieniach projektu (Settings → API) znajdziesz 3 klucze. Do `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` — URL projektu
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — **nowa konwencja** (nie szukaj "anon key" w tutorialach)
- `SUPABASE_SERVICE_ROLE_KEY` — tylko server-side, **nigdy** w zmiennej z prefiksem `NEXT_PUBLIC_` (wyciek do przeglądarki)

### Zrobione, gdy:

- [ ] Artefakty W1/W2 w jednym miejscu
- [ ] Konta założone i sprawdzone logowaniem
- [ ] `brand.md` istnieje **z konkretnymi HEX-ami i nazwami fontów** (nie "kolory z LP")
- [ ] (Track Tech) `/prepare-goal` i `/impeccable` odpowiadają w Claude Code

### Czego NIE robić

- ❌ Start buildu bez `brand.md` → AI generuje generic UI, retro-design kosztuje 1 dzień
- ❌ "Zrobię z głowy, pamiętam co było w W2" → drift od zwalidowanych insightów, MVP nie pasuje do LP

---

## Faza 1 — PRD (pon→śr)

**Cel:** sprowadzić insighty W1/W2 do JEDNEGO dokumentu, pod który AI buduje bez chaosu.

### Kroki

1. Użyj **PROMPT_PRD** (dostarczony w materiałach W3) — podłącz WSZYSTKIE artefakty z Fazy 0 + `brand.md`. *(Track Tech z szablonu: `/prd` — czyta `context/` i `brand.md` sam.)* Albo skill `prd` z shared-skills (ten sam proces, mocniejszy).
2. Model najpierw zrobi **audyt wejścia** (dopyta o luki — odpowiadaj konkretnie, nie pozwól mu zgadywać), potem zaproponuje **cięcie do 1 Core Flow** (zaakceptuj świadomie — to najważniejsza decyzja tygodnia), na końcu wygeneruje `prd.md`.
3. Przeczytaj szczególnie §6 (Out of scope) i §7 (Open Questions) — te dwie sekcje uratują Twój deadline.

### Zrobione, gdy:

- [ ] `prd.md` ma ≤ 2 strony
- [ ] §3 Core Flow = **dokładnie 1** user story z binarnymi kryteriami akceptacji
- [ ] §6 wymienia min. 5 rzeczy, które kuszą, ale NIE wchodzą
- [ ] §5 zawiera track + konkretne wersje + esencję brandu

### Czego NIE robić

- ❌ PRD na 8 stron "jak w korpo" → AI dryfuje w niuansach, 7 dni nie wystarczy
- ❌ 3 user stories "bo wszystkie ważne" → Demo Day pokazuje jedną ścieżkę, nie trzy

---

## Faza 2 — Track lock + reguły projektu

**Cel:** świadomie wybrać narzędzie, zalockować decyzję i dać narzędziu konstytucję. Zmiana tracku w środku tygodnia = restart.

### Track Builder vs Track Tech

| Wymiar                         | **Track Builder** (Lovable/v0 + Supabase + Vercel) | **Track Tech** (Claude Code + Next.js + Supabase + Vercel) |
| ------------------------------ | -------------------------------------------------- | ---------------------------------------------------------- |
| Czas do 1. działającego ekranu | ~30 min                                            | ~4-8h                                                      |
| Kontrola nad kodem             | Ograniczona (visual editor)                        | Pełna (Git, refactor)                                      |
| Skalowanie po Demo Day         | Limity narzędzia, ew. eksport kodu                 | Bez limitu — "prawdziwy" projekt Next.js                   |
| Wymagane umiejętności          | Klikanie, prompting, odrobina SQL                  | Terminal, Git, komfort z kodem                             |
| Dla kogo                       | Founder-biznes, MVP-do-walidacji                   | Founder-tech, długi runway kodu                            |

**Pułapka:** "wezmę Buildera, a po Demo Day przepiszę na Next.js" — migracja często zajmuje więcej niż budowa od zera. Wybór tracku to decyzja architektoniczna. Wybierz pod swój realny scenariusz po programie.

**Ile czasu poświęcić na decyzję — zależy od Ciebie:**
- **Masz czas i ciekawość?** Pobaw się obiema ścieżkami — odpal ten sam pierwszy ekran w Lovable i w Claude Code, zobacz, która pasuje do Twojego stylu pracy. To najlepszy sposób, żeby naprawdę zrozumieć trade-offy (i świetna nauka sama w sobie).
- **Masz mało czasu?** Nie eksperymentuj — **podejmij decyzję i się jej trzymaj.** Builder, jeśli nie jesteś techniczny; Tech, jeśli żyjesz w terminalu. Stracony dzień na "a może jednak..." boli bardziej niż nieidealny wybór.
- **Reguła pozostaje ta sama:** eksperymentuj ZANIM zalockujesz track w `prd.md` §5. Po locku — koniec zabawy, zmiana w środku tygodnia = restart.

### Reguły projektu — konstytucja dla narzędzia (KROK 3 zadania, ~10 min)

PRD mówi **CO** budujemy. Reguły mówią, **JAK narzędzie ma się zachowywać** — i są czytane automatycznie w każdej sesji, zamiast powtarzane w każdym prompcie. Bez nich: czwartkowy ekran w innym stylu niż środowy, "przy okazji" dobudowane funkcje spoza zakresu, copy wymyślone od nowa.

1. Użyj **PROMPT_Reguły projektu** (dostarczony w materiałach W3) — reguły są **wyprowadzane** z Twojego `prd.md` + `brand.md` (stack lock, brand, zakazy z §6, protokół decyzji z §7), nie wymyślane. *(Track Tech z szablonu: `/reguly` — wpisuje konstytucję wprost do `CLAUDE.md`.)*
2. Wynik wklej w narzędzie:
   - **Lovable** → Project Settings → **Knowledge** *(a jeśli masz włączony GitHub sync — Lovable czyta też `AGENTS.md`/`CLAUDE.md` z repo, więc reguły z szablonu działają bez ręcznego wklejania)*
   - **v0** → ustawienia projektu / instructions
   - **Claude Code** → plik **`CLAUDE.md`** w głównym katalogu repo
   - inne narzędzia agentowe → plik **`AGENTS.md`** (otwarty standard)
3. Test: zapytaj narzędzie "jakie są reguły tego projektu?" — ma odpowiedzieć Twoją konstytucją

### Design wiring (oba tracki) — nie projektujemy od zera

1. **HEX-y i fonty z `brand.md` siedzą w regułach projektu** (krok wyżej) — narzędzie stosuje je w każdym ekranie; przy briefingu pojedynczego ekranu możesz dodatkowo przypomnieć kluczowe wartości
2. **User flow tekstowo** w `prd.md` §3 — "Ekran A (login) → przycisk X → Ekran B" wystarczy. Nie potrzebujesz Figmy; AI generuje layout, Ty iterujesz 2-3 tury
3. **Komponenty UI deleguje narzędzie** (Builder: generator; Tech: shadcn/ui)
4. Dedykowany design (Figma/Stitch) — po Demo Day, nie teraz

### Design dla Track Tech — impeccable (odpowiednik §9 dla kodu)

Track Builder dostaje w PRD sekcję §9 (Component Inventory) i generator Lovable. Track Tech ma w zamian **impeccable** (zainstalowany w Fazie 0):

1. **`/impeccable init`** — jednorazowo, po wygenerowaniu `prd.md` + `brand.md`: skill konsumuje je i pisze `DESIGN.md` (system designu projektu, czytany przy każdej pracy nad UI)
2. **`/impeccable shape`** — przed buildem core flow (M3): plan UX/UI zanim powstanie kod — ekrany, hierarchia, stany puste/błędów
3. Komendy buildowe (`polish`, `audit`) wchodzą w Fazach 4-5 — patrz niżej

Bonus: impeccable zna typowe "AI-design tells" (Inter wszędzie, fioletowe gradienty, karty w kartach) i aktywnie ich unika — Twoje MVP nie będzie wyglądać jak każdy inny side-project.

**Opcja dla Track Builder (eksperymentalna — dla chętnych):** Lovable synchronizuje kod do GitHuba. Możesz więc zrobić audit designu na kodzie **bez opuszczania Lovable jako edytora**: (1) włącz GitHub sync w Lovable, (2) sklonuj repo i odpal `/impeccable audit` w Claude Code **tylko do odczytu** — dostajesz listę problemów (AI-slop w designie, kontrasty, responsywność), (3) poprawki wprowadzasz **z powrotem briefingami w Lovable**, nie edytując kodu ręcznie (edycja w dwóch miejscach naraz = konflikty synca). Traktuj to jak zewnętrznego recenzenta, nie zmianę narzędzia. Nie testowaliśmy tego end-to-end — jeśli spróbujesz, podziel się wynikiem na grupie.

**Druga opcja (nowsze, też nietestowane): Lovable ma natywne Skills.** Od ~maja 2026 do Lovable wgrasz skill jako markdownową paczkę: **Settings → Skills → Add → Upload ZIP** (skill z Claude eksportujesz jako `.zip`/`.skill`), albo poprosisz Lovable o zapis powtarzalnego workflow jako skill. Odpalasz go `/komendą` w prompcie lub Lovable stosuje go automatycznie. Teoretycznie pozwala to wgrać skill designowy (np. impeccable wyeksportowany do `.zip`) **wprost do Lovable** — bez objazdu przez Claude Code. **Zastrzeżenie:** komendy impeccable pisane są pod Claude Code (dostęp do plików, własny runtime), więc nie ma gwarancji że zadziałają w Lovable 1:1 — to do sprawdzenia. Jak ktoś przetestuje, niech da znać na grupie.

### Zrobione, gdy:

- [ ] Track wybrany i zapisany w `prd.md` §5
- [ ] Reguły projektu wygenerowane i wklejone w narzędzie (Knowledge / CLAUDE.md / AGENTS.md)
- [ ] Test "jakie są reguły tego projektu?" przechodzi

---

## Faza 3 — Milestones M1–M5 (środa, robimy razem)

**Cel:** rozbić Core Flow na 3-5 sekwencyjnych kroków, każdy ze sprawdzalnym "zrobione".

| Milestone                 | Co obejmuje                                                  | Zrobione, gdy                                                |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **M1 Fundament**          | Szkielet aplikacji, nawigacja, deploy preview działa         | Preview URL otwiera się, widać pierwszy ekran w brandzie     |
| **M2 Dane** *(opcjonalny)* | Tabele z `prd.md` §4 w Supabase + dane testowe — **pomiń, jeśli projekt nie potrzebuje bazy (Faza 0)** | Dane widoczne w aplikacji (lista/widok czyta z bazy)         |
| **M3 Core flow UI**       | Ekrany A→B→C z §3, z brand reference                         | Klikasz całą ścieżkę w preview                               |
| **M4 Edge cases**         | Walidacja formularzy, error states, auth (jeśli w core flow) | Świadome zepsucie (puste pole, błędny input) nie wywala apki |
| **M5 Deploy + analytics** | Publiczny URL, UTM, eventy, smoke test                       | Faza 5 ☑                                                     |

Zapisz w `goals.md`: lista M1–M5 + który fragment Core Flow z §3 realizuje każdy milestone. W trakcie buildu dopisuj decyzje (log = Twoja pamięć projektu).

**Jak wygenerować `goals.md`:** użyj **PROMPT_Milestones** (pełna treść: Załącznik na końcu dokumentu) — bierze Twój `prd.md` i rozbija Core Flow na M1–M5 z binarnym DoD i bramkami decyzyjnymi z §7. *(Track Tech z szablonu: `/milestones`.)* Robimy to razem na Spotkaniu 2, ale możesz przyjść z gotowym szkicem.

**Track Tech (Claude Code):** masz na wierzchu automatyzację `/goal`. Workflow: `/prepare-goal <opis>` generuje gotowy goal-condition (end state + proof + constraints + bound) → `/goal <condition>` w **świeżej sesji** → agent pracuje autonomicznie → review → następny. Te same M1–M5 jako capability. PROMPT_Milestones (Track Tech) generuje też gotowe linie `/goal` per milestone.

> **Twoje środowisko nie ma `/goal`?** (Cursor, czysty czat, v0, Lovable, inny harness) — to **nie problem, to ścieżka domyślna.** `/goal` jest tylko automatyzacją Claude Code na wierzchu milestone'ów. Bez niej: milestone = **jednostka uruchamiana ręcznie.** Bierzesz M{N} z `goals.md`, wklejasz jego **Definition of Done jako definicję "zrobione"** do briefingu w swoim narzędziu, iterujesz aż DoD przejdzie, dopiero wtedy następny. Output PROMPT_Milestones (binarne DoD + bramki decyzyjne per milestone) jest dokładnie tym, co wklejasz — niezależnie od narzędzia. Tor Builder w tym playbooku to właśnie ten tryb.

---

## Faza 4 — Build (środa → sobota)

**Cel:** każdy milestone działa i jest sprawdzony, ZANIM ruszy następny.

### Rytm pracy per milestone (Track Builder)

```
opisz milestone w briefingu (z brand.md!)  →  Lovable generuje  →  sprawdź w preview  →  iteruj 2-3 razy  →  następny
```

- 1 briefing = 1 ekran lub 1 feature. Prośba o "cały dashboard naraz" = utrata kontroli + pominięte stany puste/błędów
- Testuj w preview PRZED przejściem dalej — 15 min sprawdzania > 3h debugowania w piątek
- **Log decyzji:** Lovable/v0 **nie zapisze decyzji do dowolnego pliku** w repo z poziomu czatu (inaczej niż agent w terminalu). Prowadź `goals.md` **ręcznie — 1 linia na sesję** ("M3: wybrałem flow bez koszyka, bo §3 ma jeden produkt"). Masz włączony GitHub sync w Lovable? → możesz commitować log do repo. Inaczej trzymaj go obok (Notion/plik) — log to Twoja pamięć projektu, nie pomijaj.

### Rytm pracy per goal (Track Tech)

```
/prepare-goal  →  /goal w świeżej sesji  →  agent pracuje  →  review checkpoint  →  next
```

- **Zawsze świeża sesja per goal** — kontekst poprzedniego goala obniża jakość
- Agent przerywa przy decyzjach z §7 Open Questions — to celowe, decyzja należy do Ciebie
- **Design checkpoint (impeccable):** po M3 (core flow UI) odpal `/impeccable polish` — wyrówna UI do DESIGN.md i wyłapie "AI-design tells" zanim utrwalą się w kolejnych ekranach

### Co AI decyduje samo, a co Ty

| AI decyduje                                     | Ty decydujesz                                 |
| ----------------------------------------------- | --------------------------------------------- |
| Jak zaimplementować (algorytmy, struktura kodu) | Wybór usług oznaczonych TBD w §7              |
| Drobne UX w ramach brand reference              | Treści i copy (Twoja zwalidowana value prop!) |
| Kolejność kroków wewnątrz milestone'u           | Każda zmiana zakresu poza §3 Core Flow        |

### Codzienny rytm (czwartek–sobota)

- **Rano (30 min):** przejrzyj wczorajszy efekt, zaktualizuj `goals.md`, zaplanuj dzień
- **Praca (2-4h):** 1-2 milestone'y
- **Wieczór (15 min):** smoke test preview + krótka notatka co dalej

**Bloker dłuższy niż 30 minut = pytanie na grupie.** Nie kop samotnie godzinami — ktoś już to przerabiał.

---

## Faza 5 — Deploy + analytics + handoff (sobota → niedziela)

**Cel:** MVP pod publicznym URL-em, gotowe na ruch z LP i analitykę Wojtka (Week 4).

### Kroki

1. **Production deploy:** Builder — publikacja przez UI narzędzia; Tech — merge do main / `vercel --prod`. Zostań na domenie `*.vercel.app` / domenie narzędzia — custom domain z migracją DNS w ostatni dzień to ryzyko 24h propagacji.
2. **Analytics — minimum po Twojej stronie, reszta w W4.**
   - **Vercel Analytics (zrób teraz — 1 linijka):** `@vercel/analytics` + `<Analytics/>` w root layoutu. Daje page views i Web Vitals za darmo na Vercel, zero konfiguracji. Tyle wystarczy z Twojej strony. *(Track Builder na Lovable/v0: tylko jeśli deploy idzie przez Vercel — jak nie, pomiń.)*
   - **Zostaw haczyki pod resztę** (puste miejsce, nie instalacja): parametry UTM łapane na wejściu · `data-analytics-event="nazwa-zdarzenia"` na przyciskach core flow · puste `<!-- analytics -->` w `<head>`.
   - *(do wiadomości — NIE robisz tego teraz)* **PostHog** (zdarzenia produktowe, lejki) i pełna analityka wchodzą w **W4 z Wojtkiem** — instalację i strojenie robi on. Wspominam, żebyś wiedział pod co zostawiasz haczyki.
3. **(Track Tech) `/impeccable audit`** przed smoke testem — automatyczny przegląd a11y, responsywności i jakości UI; pokrywa część DoD (mobile ≥375px) zanim sprawdzisz ręcznie.
4. **Smoke test — zawsze w trybie incognito:**
   - Otwórz produkcyjny URL w oknie incognito → przejdź cały Core Flow
   - Sprawdź na mobile (DevTools, 375px)
   - Logowanie Google/OAuth przetestuj OSOBIŚCIE — agent nie ma prawdziwych kont, więc tego za Ciebie nie sprawdził
5. **Handoff na grupę:** URL + lista zdarzeń analytics + znane braki (uczciwie — "known issues" to profesjonalizm, nie wstyd)

### ⚠️ Vercel Deployment Protection (częsta pułapka)

Vercel domyślnie chroni nowe projekty: aliasy `<projekt>-<team>.vercel.app` zwracają **401** dla niezalogowanych. Publiczny jest tylko **canonical alias** (ten "losowy" typu `mojprojekt-khaki.vercel.app`). Przed ogłoszeniem URL-a: sprawdź w incognito albo wyłącz Protection (Settings → Deployment Protection).

### Zrobione, gdy:

- [ ] URL działa publicznie (incognito → core flow przechodzi end-to-end)
- [ ] Mobile responsive (≥375px)
- [ ] Hooki analytics na miejscu
- [ ] Handoff na grupie: URL + lista eventów + known issues
- [ ] `prd.md` §8 Definition of Done — wszystko ☑

---

## Anty-wzorce — skrót lodówkowy

| ❌ Nie rób                            | ✅ Zamiast tego                                     |
| ------------------------------------- | --------------------------------------------------- |
| Build bez `brand.md`                  | Faza 0 krok 3 — 30 min, oszczędza dzień             |
| PRD na 8 stron                        | 2 strony, 1 core flow, mocny Out of scope           |
| 3 user stories                        | 1 zrobiona dobrze                                   |
| Zmiana tracku w środku tygodnia       | Decyzja w pon/wt jest ostateczna                    |
| Figma "bo tak wypada"                 | Flow tekstowo + brand.md, UI generuje narzędzie     |
| Cały ekran/feature w jednym prompcie  | 1 briefing = 1 komponent/ekran, iteruj              |
| Pominięcie testu między milestone'ami | 15 min preview > 3h debugowania                     |
| Custom domain w ostatni dzień         | `*.vercel.app` do Demo Day                          |
| Demo Day jako pierwszy smoke test     | Incognito test dzień wcześniej + lista known issues |
| Samotne kopanie 2h w blokerze         | 30 min → pytanie na grupie                          |

---

## Ile to realnie kosztuje? (dane z pilotażu MentorMatch)

Playbook przetestowałem end-to-end na projekcie MentorMatch (marketplace konsultacji junior↔senior dev, Track Tech):

| Etap                          | Realny czas                    |
| ----------------------------- | ------------------------------ |
| Faza 0 (input lock)           | 6 min (artefakty były gotowe!) |
| Faza 1 (PRD ze skilla)        | 7 min                          |
| Fazy 2-3 (setup + milestones) | 13 min                         |
| **Cała planistyka**           | **~30 min**                    |
| Build M1+M2                   | ~2h                            |
| Build M3+M4                   | ~3h                            |
| Build M5 (deploy)             | ~4h                            |
| **Cały build**                | **~7h**                        |

> **Co znaczy te "~7h"?** To **czas zegarowy z agentem pracującym w tle + Twoje review na bramkach — nie 7h ciągłego klikania.** Agent potrafi mleć jeden milestone kilkadziesiąt minut do kilku godzin; Ty wracasz tylko na checkpointach (DoD, bramki §7). Twój realny hands-on jest **dużo krótszy** niż suma w tabeli. Nie czytaj tego jako "7h przy klawiaturze" — czytaj jako "tyle trwa, zanim build się domknie, w większości bez Ciebie".

Efekt: działający marketplace pod publicznym URL-em (auth Google, lista mentorów, rezerwacja slotu, fake checkout, analytics hooks). Wnioski dla Ciebie:

1. **Planistyka jest tania, build jest drogi** — dlatego nie skracaj Faz 0-1, one decydują o jakości buildu
2. **7 dni to deadline, nie harmonogram** — możesz zrobić plan w środę, przerwę w czwartek i build w piątek-sobotę, byle niedziela się zgadzała
3. Dwie pułapki z pilotażu wpisane wyżej: Vercel Deployment Protection (401) i OAuth, którego agent sam nie przetestuje

---

## Po Demo Day — co dalej

Week 4 (Wojtek) = soft launch + analityka + iteracja na feedbacku userów. Zasada: drobne zmiany pod konkretny feedback, NIE przepisywanie PRD. Jeśli feedback wymusza duży rewrite — to uczciwy sygnał, że scope był cięty nie tam, gdzie trzeba. Wracasz do insightów W1/W2, nie do kodu.

Track Builder, który chce kontynuować po programie: rozważ eksport kodu / przepisanie na stack Tech — porozmawiajmy indywidualnie.

---

_Pytania w trakcie tygodnia → grupa programu. Bloker > 30 min = pisz. Powodzenia! 🚀_ na stack Tech — porozmawiajmy indywidualnie.

---

_Pytania w trakcie tygodnia → grupa programu. Bloker > 30 min = pisz. Powodzenia! 🚀_
