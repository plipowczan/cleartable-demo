# PROMPT_Milestones — dekompozycja PRD na goals.md (krok 4, Faza 3)

> **Krok 4** (po PRD i regułach). Output: plik `goals.md` — Twój Core Flow rozbity na **3–5 sekwencyjnych milestone'ów M1–M5**, każdy ze sprawdzalnym "zrobione".
> To Faza 3 playbooka. Na Spotkaniu 2 (środa) robimy to razem — ten prompt pozwala przyjść z gotowym szkicem albo zrobić to samodzielnie.
> Universal — działa w Claude, ChatGPT, Gemini i każdym innym modelu.

## Po co ten krok?

PRD mówi CO zbudować. `goals.md` mówi **W JAKIEJ KOLEJNOŚCI i jak sprawdzić, że każdy etap działa**, ZANIM ruszysz dalej. Bez tego budujesz wszystko naraz, a w piątek odkrywasz, że 3 rzeczy są w połowie. Z milestone'ami: po każdym masz działający, sprawdzony kawałek — i checkpoint, na którym wyłapujesz błąd w 15 minut zamiast w 3 godziny.

**Reguły dekompozycji (twarde):**
- **M1 zawsze fundament**, ostatni milestone zawsze **deploy** (publiczny URL + smoke test)
- **Dane przed UI** (UI czyta z danych)
- **Sekwencyjnie**, bez równoległości (1 founder, 1 agent)
- Każdy milestone mapuje się na fragment Core Flow §3 (ślad audytowy)

## Track Tech — masz skill zamiast promptu

Jeśli jesteś na Track Tech (Claude Code), użyj skilla **`/prepare-goal`** z shared-skills — produkuje gotowy `/goal <condition>` z 4 elementami (end state · proof · constraints · bound). Ten prompt robi to samo uniwersalnie + dodatkowo generuje warstwę milestone'ów dla całości.

## JAK UŻYWAĆ PROMPTU

1. Skopiuj blok poniżej (od `---PROMPT START---` do `---PROMPT END---`)
2. Wklej do nowego okna w dowolnym modelu AI
3. Podłącz swój **`prd.md`** (cały — model potrzebuje §3 Core Flow, §4 Data model, §7 Open Questions, §5 track)
4. Wynik zapisz jako `goals.md`. Na środę przynieś go razem z `prd.md`.

---PROMPT START---

[ROLA]
Jesteś tech leadem planującym 7-dniowy build MVP z agentem AI. Twoja supermoc to rozbijanie zwalidowanego zakresu na 3–5 sekwencyjnych milestone'ów, z których każdy jest sprawdzalny binarnie (działa / nie działa) ZANIM ruszy następny. Nie planujesz "wszystkiego naraz" — planujesz warstwami, od fundamentu do deployu.

[ZADANIE]
Z dostarczonego `prd.md` wygeneruj `goals.md` — dekompozycję Core Flow (§3) na 3–5 milestone'ów M1–M5.

[KROK 1 — EKSTRAKCJA Z PRD]
Wyciągnij i wypisz krótko:
1. **Core Flow (§3):** ekrany A→B→C i acceptance criteria (to jest CAŁY zakres do rozbicia)
2. **Encje (§4):** lista encji danych i ich zależności
3. **Track (§5):** Tech czy Builder (determinuje format bounds: tury vs time-box)
4. **Open Questions (§7):** decyzje, na których agent ma się zatrzymać (bramki decyzyjne per milestone)

Jeśli `prd.md` nie ma wyraźnego §3 Core Flow lub §4 Data model — zatrzymaj się i poproś o uzupełnienie (bez tego dekompozycja będzie zgadywana).

[KROK 2 — DEKOMPOZYCJA wg warstw]
Zastosuj sztywne grupowanie po warstwie (NIE 1 milestone = 1 user story):

| Milestone | Warstwa | Zakres | Bound (Tech: tury / Builder: time-box) |
|---|---|---|---|
| M1 | fundament | szkielet stacku, shell auth, deploy preview działa | 80–100 tur / pół dnia |
| M2 | dane | encje z §4 + dane testowe (seed) | 80–100 tur / pół dnia |
| M3 | core flow UI | ekrany A→B→C z §3, z brand reference | 100–120 tur / 1 dzień |
| M4 | integracja + edge cases | auth, walidacja formularzy, error states, stany puste | 60–80 tur / pół dnia |
| M5 | deploy | publiczny URL + smoke test (+ Vercel Analytics, 1 linijka; reszta analityki = W4) | 40–60 tur / pół dnia |

Zasady kolejności (absolutne): M1 fundament pierwszy · dane przed UI · deploy ostatni · sekwencyjnie, bez równoległości · NIE rób baseline OpenSpec (overhead w 7 dni). Jeśli Core Flow jest mały, możesz połączyć M3+M4 → wtedy 4 milestone'y zamiast 5 (to OK).

> ⚠️ **Realny koszt (z pilotażu):** bounds w turach bywają 4–5× wyższe niż intuicja (pełny stack Next.js+Supabase to ~360–450 tur łącznie, nie 75). Deploy (M5) zaniżany najczęściej. Traktuj bounds jako informację kosztową, nie sztywny limit — Tech: `/prepare-goal` i tak sam dobiera bound do zakresu.

[KROK 3 — GENERACJA goals.md]
Dla każdego milestone'u wypisz dokładnie:

## M{N} — {nazwa warstwy}
- **Capability (1 zdanie):** co po tym milestonie działa
- **Pokrywa z Core Flow §3:** które acceptance criteria / ekrany realizuje (ślad audytowy)
- **Definition of Done (binarne, sprawdzalne):** nie "auth działa", tylko "ekran /mentors renderuje się pod URL z auth gate; niezalogowany → redirect do logowania"
  - [ ] ...
  - [ ] ...
- **Bound:** {tury (Tech) / time-box (Builder)}
- **Bramki decyzyjne (z §7):** przy których Open Questions agent ma PYTAĆ, nie zgadywać

[KROK 4 — TYLKO Track Tech: gotowe /goal conditions]
Jeśli §5 = Track Tech, dla każdego milestone'u dodaj gotową komendę `/goal` w jednej linii, ze 4 elementami:

```
/goal <end state — jeden mierzalny stan końcowy>; you prove this by <jak agent udowodni w swojej wiadomości: paste output / git status / lista plików / URL>; <constraints — co NIE może się zmienić, np. "no files outside src/ modified">; or stop after <N> turns
```

Limit jednej komendy: 4000 znaków. Każdy `/goal` MUSI mieć bound ("or stop after N turns") — żaden nie leci w nieskończoność.

Dla Track Builder pomiń ten krok — milestone = briefing w narzędziu (Lovable/v0), DoD ten sam, bez `/goal`.

[KROK 5 — PODSUMOWANIE]
Na końcu sprawdź i potwierdź:
- [ ] 3–5 milestone'ów, M1 = fundament, ostatni = deploy
- [ ] każdy fragment Core Flow §3 ma przypisany milestone
- [ ] każdy milestone ma binarne DoD i bound
- [ ] bramki decyzyjne z §7 rozłożone na właściwe milestone'y

[KONTEKST WEJŚCIOWY]

**Track (Tech / Builder — jeśli nie wiesz, sprawdzę w §5 prd.md):**
[WKLEJ TUTAJ]

**Moje prd.md (cały):**
[WKLEJ TUTAJ]

---PROMPT END---

## Po wygenerowaniu — checklist

- [ ] `goals.md` ma 3–5 milestone'ów (M1 fundament → M_ostatni deploy)
- [ ] Każdy milestone: capability + mapowanie do §3 + binarne DoD + bound + bramki §7
- [ ] (Track Tech) każdy milestone ma gotowy `/goal <condition>` z 4 elementami, ≤ 4000 znaków
- [ ] (Track Builder) milestone = briefing, ten sam DoD, bez `/goal`
- [ ] Zapisane jako `goals.md` — przynieś na środę razem z `prd.md`

## Przykład (MentorMatch — pilotaż)

Core Flow: login Google → lista dostępnych mentorów → profil + wybór 30-min slotu → fake checkout → potwierdzenie z Zoom linkiem. Dekompozycja:
- **M1 fundament** — Next.js 15 + Supabase + Vercel, OAuth shell, deploy preview
- **M2 dane** — encje User/Mentor/Slot/Booking + seed mentorów
- **M3 core flow UI** — ekrany login→lista→profil→slot→checkout→potwierdzenie, brand
- **M4 edge cases** — race przy podwójnej rezerwacji, error "slot właśnie zajęty", status "available now"
- **M5 deploy + handoff** — publiczny URL, smoke test, Vercel Analytics (1 linijka), URL przekazany do W4

Realny przebieg: ~367 tur łącznie (G5/deploy najdroższy — 105 tur przez Vercel Deployment Protection i test OAuth). Lekcja: nie zaniżaj deployu.
