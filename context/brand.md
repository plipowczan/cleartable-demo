# Brand Reference — ClearTable PL

> Kierunek: **Zaufanie / instytucjonalny** (Ścieżka B — projekt od zera z ICP + pozycjonowania).
> Stosuj w KAŻDYM ekranie. To brief dla agenta UI (Lovable / v0 / Claude Code), nie księga znaku.

## 1. Esencja

Dla post-seed CEO polskiej sp. z o.o. ("Zarządca Chaosu"), który używa produktu w stresie przed rundą i boi się wyjść na amatora przed funduszem. Styl ma robić wrażenie **bezpiecznej, fintech-grade infrastruktury, którą inwestor zaakceptuje bez mrugnięcia** — bo kluczowy blocker segmentu to IT compliance i ryzyko weta VC na danych udziałowych (źródło: Micro-ICP, „jedno ryzyko do wyeliminowania"). Spokojny granat + gęste, precyzyjne dane = przeciwieństwo „v17_final_final.xlsx".

## 2. Paleta

| Rola | HEX | Użycie |
|---|---|---|
| Primary | `#0F2A4A` | przyciski CTA, nagłówki sekcji, logo, brand anchor |
| Secondary | `#1D6FB8` | linki, akcenty interaktywne, ikony, secondary button |
| Background | `#F6F8FB` | tło stron (chłodny prawie-biały) |
| Surface | `#FFFFFF` | karty, panele, tabele, modale |
| Text primary | `#0F1B2D` | tekst główny, liczby cap table |
| Text muted | `#51607A` | opisy, labele, pomocniczy tekst, nagłówki tabel |
| Success / Error | `#1F8A5B` / `#C2362F` | walidacja KRS OK / błąd groszowy, stan błędu |
| Border / divider | `#E2E8F0` | linie tabel, obramowania kart, separatory |

Kontrast par (WCAG AA ≥4.5:1): biały na Primary `#0F2A4A` ≈ 12.8:1 ✓ · Text primary na Background ≈ 15:1 ✓ · Text muted `#51607A` na Surface ≈ 5.0:1 ✓ · Secondary `#1D6FB8` na Surface ≈ 4.6:1 ✓.

## 3. Typografia

- **Heading font:** Plus Jakarta Sans — weights 600, 700. Autorytatywny, ale nie korpo-nudny; odróżnia od generycznego Inter.
- **Body font:** Inter — weights 400, 500, 600.
- **Mono / numeric font:** IBM Plex Mono — weight 500. **Obowiązkowy** na kwotach PLN, procentach udziałów, liczbach cap table i wynikach symulacji waterfall (tabular-nums, wyrównanie do prawej).
- **Skala:**
  - H1 — 40px / 2.5rem, weight 700, line-height 1.15
  - H2 — 28px / 1.75rem, weight 600, line-height 1.25
  - body — 16px / 1rem, weight 400, line-height 1.55
  - small — 13px / 0.8125rem, weight 500 (labele, captiony tabel)

## 4. Voice & tone

Mówimy językiem klienta — surowym, konkretnym, bez korpomowy ("nie klikaj tych pieprzonych maili", "żeby nie gubić drobnych na ulicy"). Ton: **rzeczowy partner, który zdejmuje stres, a nie robi z foundera finansisty** — "Aplikacja robi matmę za Ciebie, żebyś mógł dowozić produkt". Twarde liczby zamiast obietnic (25 000 zł, 3.75 mln PLN, 2 tygodnie → 1 dzień); zero żargonu equity management — sprzedajemy napięcie i konsekwencję, nie kategorię software.

## 5. Zasady UI

- **Zaokrąglenia:** `rounded-lg` 8px na kartach/inputach/buttonach; `rounded-md` 6px na badge'ach i tagach. Bez ostrych kantów, bez pełnych pill-ów.
- **Cienie:** subtelne, jedna warstwa — `shadow-sm` (0 1px 2px rgba(15,42,74,0.06)) na kartach; `shadow-md` tylko na modalach/dropdownach. Zero glow, zero neon.
- **Gęstość:** data-dense w tabelach cap table (row height 44px, padding komórek 12px), ale przewiewny layout marketingowy/onboarding. Liczby zawsze mono + wyrównane do prawej.
- **Przyciski:** Primary = solid `#0F2A4A`, biały tekst, weight 600. Secondary = outline `#1D6FB8` 1px na tle Surface. Bez gradientów na CTA.
- **Ikonografia:** Lucide (outline, stroke 1.5–2px), jednokolorowe w `#51607A` lub `#1D6FB8`. Spójny styl, zero mieszania filled/outline.
- **Stany danych:** KAŻDY widok z danymi obsługuje stan pusty (krótka instrukcja + 1 CTA) i błąd (czerwony `#C2362F`, konkretny komunikat, np. „rozjazd groszowy w KRS"). Walidacja zgodności KRS = wyraźny zielony `#1F8A5B` badge.
- **Tryb:** Light mode jako domyślny i jedyny w MVP (instytucjonalny, „raport dla funduszu"). Dark mode poza zakresem 7 dni.

## 6. Czego unikać

- **Amerykańskiej estetyki SaaS-demo** (fiolet/gradient/emoji, „get back to work" w stylu Pulley) — osłabia sygnał bezpieczeństwa danych krytyczny dla akceptacji VC.
- **Wyglądu Excela/arkusza** — szare siatki, domyślne bordery, Calibri/Arial. To jest dokładnie ten „v17_final_final.xlsx", od którego uciekamy.
- **Przeładowania kolorem** — żadnych wielokolorowych wykresów-tęcz; cap table i waterfall trzymaj na navy + 1–2 odcieniach blue + stany.
- **Marketingowej nowomowy i stock-fintech ilustracji** (3D monety, abstrakcyjne „wzrosty") — ICP to detektor ściemy, który po godzinie porzucił Cartę.
- **Anglojęzycznych etykiet w UI** (`shares`, `409A`) — używamy „udziały", „KRS", „KSH", PLN. Angielski tu = sygnał, że narzędzie nie rozumie polskiej sp. z o.o.
