# PROMPT_Brand Reference (brand.md)

> **Krok 1 zadania po Spotkaniu 1** (przed PRD!). Output: plik `brand.md` — wizualne DNA Twojego produktu, które wkleisz do każdego promptu UI w trakcie buildu.
> Universal — działa w Claude, ChatGPT, Gemini i każdym innym modelu.

## Po co ten krok?

AI generując interfejs bez brand reference tworzy **generic UI** — wygląda jak każdy inny side-project i nie pasuje do Twojego landing page'a. Retro-design w środku tygodnia kosztuje 1 dzień. Dlatego brand powstaje PRZED PRD i przed pierwszą linijką buildu.

**Masz dwie ścieżki:**

- **Ścieżka A — masz opublikowany LP** (landingi.com / carrd / Framer / cokolwiek): wyciągamy brand z tego, co już zwalidowałeś. LP i MVP mają wyglądać jak jedna rodzina.
- **Ścieżka B — nie masz LP ani brandu** (workbook z W2 tego nie obejmował — to normalne): generujemy brand od zera z Twoich artefaktów W2. ICP i positioning determinują estetykę — inaczej wygląda narzędzie dla prawnika VC, inaczej dla foundera-inżyniera.

## JAK UŻYWAĆ PROMPTU

1. Skopiuj blok poniżej (od `---PROMPT START---` do `---PROMPT END---`)
2. Wklej do nowego okna rozmowy w dowolnym modelu AI
3. Uzupełnij sekcje wejściowe (ścieżka A: dodatkowo wklej screenshot LP lub podaj URL, jeśli model ma dostęp do internetu)
4. Wynik zapisz jako `brand.md` — będzie Ci potrzebny w prompcie PRD (krok 2) i w każdym briefingu UI w trakcie buildu

---PROMPT START---

[ROLA]
Jesteś senior brand designerem i design system architectem. Specjalizujesz się w tworzeniu zwięzłych brand reference dla produktów digital — dokumentów, które agent AI (Lovable, v0, Claude Code) konsumuje jako kontekst przy generowaniu UI. Twój output jest konkretny i wykonywalny: HEX-y, nazwy fontów, zasady — zero poetyckich opisów typu "ciepły, ale profesjonalny błękit".

[ZADANIE]
Na podstawie dostarczonych materiałów wygeneruj plik `brand.md` — brand reference dla MVP budowanego w 7 dni.

Najpierw ustal ścieżkę:
- Jeśli dostarczyłem screenshot lub opis istniejącego landing page'a → ŚCIEŻKA A: wyekstrahuj brand z LP (kolory, typografia, ton copy). Niczego nie wymyślaj — odtwórz to, co jest, i uzupełnij brakujące elementy spójnie z tym, co widzisz.
- Jeśli NIE ma landing page'a → ŚCIEŻKA B: zaprojektuj brand od zera. Wyprowadź decyzje wprost z ICP i pozycjonowania: kto jest użytkownikiem, w jakim kontekście emocjonalnym używa produktu (stres? rutyna? aspiracja?), z czym konkuruje wizualnie. Uzasadnij każdą decyzję jednym zdaniem odwołującym się do moich danych.

[WYMAGANY FORMAT OUTPUTU — dokładnie ta struktura]

# Brand Reference — {nazwa projektu}

## 1. Esencja (2-3 zdania)
Dla kogo jest ten styl (ICP), jakie wrażenie ma robić i dlaczego (1 zdanie uzasadnienia z moich danych).

## 2. Paleta (konkretne HEX-y)
| Rola | HEX | Użycie |
|---|---|---|
| Primary | #... | przyciski CTA, akcenty |
| Secondary | #... | elementy wspierające |
| Background | #... | tło stron |
| Surface | #... | karty, panele |
| Text primary | #... | tekst główny |
| Text muted | #... | opisy, labele |
| Success / Error | #... / #... | stany |

## 3. Typografia
- Heading font: {nazwa z Google Fonts} + weights
- Body font: {nazwa z Google Fonts} + weights
- (opcjonalnie, jeśli produkt jest data-heavy — tabele, kwoty, %) Mono/numeric font: {nazwa z Google Fonts}
- Skala: H1 / H2 / body / small (px lub rem)

## 4. Voice & tone (2-3 zdania)
Jak produkt mówi do użytkownika. Użyj języka klienta z moich materiałów (atomy komunikacji, cytaty z wywiadów) — nie wymyślaj nowego tonu.

## 5. Zasady UI (5-7 punktów)
Konkretne reguły dla generatora: zaokrąglenia, cienie, gęstość, styl przycisków, ikonografia, light/dark. Każda zasada wykonalna ("rounded-lg 8px", nie "nowoczesny look").

## 6. Czego unikać (3-5 punktów)
Anty-wzorce wizualne dla tego ICP (np. "żadnych gradientów neonowych — użytkownik to konserwatywny sektor prawny").

[ZASADY]
1. Wszystkie kolory jako HEX. Wszystkie fonty jako nazwy z Google Fonts (darmowe, dostępne w każdym narzędziu).
2. Maksymalnie 1 strona. To brief dla agenta, nie księga znaku.
3. Ścieżka B: zaproponuj DWA warianty kierunku (np. "zaufanie/instytucjonalny" vs "energia/challenger") po 3 zdania każdy i poproś mnie o wybór ZANIM wygenerujesz pełny dokument.
4. Dopytuj TYLKO gdy brakuje danych wejściowych (ICP, pozycjonowanie) — decyzje estetyczne zawsze wyprowadzasz sam z tego, co masz.
5. Zadbaj o kontrast tekst/tło min. 4.5:1 (WCAG AA) dla par kolorów z palety.

[KONTEKST WEJŚCIOWY]

**Nazwa projektu i jedno zdanie co robi:**
[WKLEJ TUTAJ]

**Ścieżka A — landing page (screenshot / URL / opis kolorów i fontów, jeśli masz):**
[WKLEJ TUTAJ albo wpisz "BRAK — ścieżka B"]

**Micro-ICP / beachhead (z W2):**
[WKLEJ TUTAJ — profil z ćwiczenia Micro-ICP]

**Pozycjonowanie (z W2 — 5 wymiarów, zwłaszcza kategoria rynkowa):**
[WKLEJ TUTAJ]

**Atomy komunikacji / kluczowe cytaty klientów (z W2 — opcjonalnie, 5-10 najlepszych):**
[WKLEJ TUTAJ]

---PROMPT END---

## Po wygenerowaniu — checklist

- [ ] Każdy kolor ma HEX (nie "granatowy")
- [ ] Fonty istnieją w Google Fonts (sprawdź: fonts.google.com)
- [ ] Voice & tone brzmi jak Twoi klienci z wywiadów, nie jak korpo-marketing
- [ ] Całość mieści się na 1 stronie
- [ ] Zapisane jako `brand.md` — gotowe do wklejenia w prompt PRD (krok 2)
