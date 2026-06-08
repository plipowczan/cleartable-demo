# PROMPT_Reguły projektu (AGENTS.md / CLAUDE.md / Lovable Knowledge)

> **Krok 3 zadania po Spotkaniu 1** (po PRD — zajmie Ci ~10 minut). Output: krótki dokument reguł, który Twoje narzędzie AI czyta przy KAŻDEJ sesji buildu.
> Universal — działa w Claude, ChatGPT, Gemini i każdym innym modelu.

## Po co ten krok?

PRD mówi **CO** budujemy. Reguły projektu mówią, **JAK AI ma się zachowywać** w trakcie buildu — i są dziedziczone automatycznie w każdej sesji, zamiast powtarzane w każdym prompcie.

Bez reguł: w środę wkleisz brand do promptu, w czwartek zapomnisz — i dostaniesz ekran w innym stylu. Poprosisz o poprawkę formularza — a AI "przy okazji" dorzuci feature spoza zakresu. Reguły to konstytucja projektu: stack, brand, zakazy i protokół decyzji w jednym miejscu.

**Gdzie ląduje wynik (zależnie od tracku):**

| Track | Gdzie wkleić |
|---|---|
| **Builder — Lovable** | Project Settings → **Knowledge** (wklej całość) |
| **Builder — v0** | Project → ustawienia / instructions |
| **Tech — Claude Code** | Plik **`CLAUDE.md`** w katalogu głównym repo |
| Inne narzędzia agentowe | Plik **`AGENTS.md`** w repo (otwarty standard czytany przez większość narzędzi) |

## JAK UŻYWAĆ PROMPTU

1. Skopiuj blok poniżej (od `---PROMPT START---` do `---PROMPT END---`)
2. Wklej do nowego okna rozmowy w dowolnym modelu AI
3. Podłącz swoje `prd.md` i `brand.md` — reguły są z nich WYPROWADZANE, nie wymyślane
4. Wynik wklej w miejsce z tabeli powyżej i zapisz też jako plik w folderze projektu

---PROMPT START---

[ROLA]
Jesteś inżynierem kontekstu dla narzędzi AI budujących aplikacje (Lovable, v0, Claude Code). Tworzysz zwięzłe dokumenty reguł projektu — "konstytucje", które narzędzie czyta przy każdej sesji. Twoja zasada: reguły się EKSTRAHUJE z dokumentów projektu, nie wymyśla. Krótko i rozkazująco — każda linia musi zmieniać zachowanie narzędzia; jeśli nie zmienia, wylatuje.

[ZADANIE]
Z dostarczonego `prd.md` i `brand.md` wygeneruj dokument reguł projektu dla podanego narzędzia (maksymalnie 1 strona), w dokładnie tej strukturze:

# Reguły projektu — {NAZWA}

## Czym jest ten projekt (2-3 zdania)
Z §1 PRD: co budujemy i dla kogo + AI Build Summary przepisane 1:1.

## Stack (zalockowany — nie zmieniaj)
Z §5 PRD: narzędzia + konkretne wersje. Dopisz: "Nie proponuj zmiany stacku ani dodatkowych bibliotek bez pytania."

## Brand (stosuj w KAŻDYM ekranie)
Z brand.md: HEX-y z rolami, fonty, 2-3 najważniejsze zasady UI, 1-2 rzeczy zakazane. Dopisz: "Każdy nowy ekran/komponent używa tych wartości. Nie wymyślaj własnych kolorów ani fontów."

## Zakres — twarde granice
Z §3 PRD: jedno zdanie czym jest Core Flow. Z §6 PRD: lista rzeczy POZA zakresem. Dopisz: "Nie dodawaj funkcji spoza Core Flow, nawet jeśli wydają się przydatne. Jeśli uważasz, że czegoś brakuje — zapytaj, nie buduj."

## Protokół decyzji
- Pytania otwarte (z §7 PRD): wypisz je. "Przy tych tematach ZATRZYMAJ SIĘ i zapytaj."
- Decyzje techniczne w ramach stacka: podejmuj sam.
- Treści i copy: używaj sformułowań z PRD/brand (zwalidowany język), nie generuj własnego marketingu.

## Konwencje
3-5 punktów dopasowanych do tracku, np.: język UI (polski/angielski), responsywność od 375px, obsługa stanów pustych i błędów w każdym widoku z danymi.

[ZASADY]
1. Wszystko wyprowadzasz z dostarczonych plików. Jeśli czegoś w nich nie ma (np. język UI) — przyjmij najbardziej oczywiste założenie z kontekstu i poproś o potwierdzenie w JEDNYM zbiorczym pytaniu (nie blokuj generacji przy oczywistych brakach).
2. Maksymalnie 1 strona. To konstytucja, nie dokumentacja.
3. Tryb rozkazujący ("Używaj X", "Nie rób Y") — narzędzie ma wykonywać, nie interpretować.
4. Dopasuj nagłówek/format do narzędzia, które podam (CLAUDE.md / AGENTS.md / Lovable Knowledge — treść ta sama, czysty markdown).

[KONTEKST WEJŚCIOWY]

**Narzędzie docelowe (Lovable Knowledge / v0 / CLAUDE.md / AGENTS.md):**
[WKLEJ TUTAJ]

**Moje prd.md (z kroku 2):**
[WKLEJ TUTAJ]

**Moje brand.md (z kroku 1):**
[WKLEJ TUTAJ]

---PROMPT END---

## Po wygenerowaniu — checklist

- [ ] Mieści się na 1 stronie
- [ ] Zawiera HEX-y i fonty (nie odsyła do innego pliku — Lovable Knowledge nie czyta plików)
- [ ] Sekcja "Zakres" wymienia zakazy z §6 PRD
- [ ] Wklejone w narzędzie (Knowledge / CLAUDE.md w repo) — sprawdź: zapytaj narzędzie "jakie są reguły tego projektu?"
- [ ] **Test behawioralny** (mocniejszy): poproś o pierwszy ekran BEZ przypominania o brandzie — narzędzie samo powinno użyć Twoich kolorów i fontów. Jeśli nie — reguły nie są czytane
