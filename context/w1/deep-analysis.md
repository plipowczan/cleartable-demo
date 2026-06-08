# Week 1 — Deep Analysis Engine (ClearTable PL)

> **Projekt demo:** ClearTable PL (cap table SaaS) — workbook ClearTable, AI Startup Builders #2
> **Źródło:** wyciąg z workbooka Damiana (output, prompty instruktażowe pominięte)

## OUTPUT 2 — DEEP ANALYSIS ENGINE

### Layer 1 — Dekompozycja problemu

Ukryte założenia w opisie pomysłu:

| Twierdzenie | Typ |
| :---- | :---- |
| "Założyciele nie rozumieją cap table" | PRZEKONANIE — wymaga potwierdzenia stopniem nierozumienia i momentu w którym to boli |
| "Edukacja inline zwiększa adopcję narzędzia" | PRZEKONANIE — może być prawdą lub barierą (TIPy ignorowane, "za dużo tekstu") |
| "Polskie prawo tworzy lukę vs narzędzia zagraniczne" | FAKT częściowy — narzędzia zagraniczne rzeczywiście nie obsługują sp. z o.o. dobrze, ale czy to jest bloker dla użytkowników? |
| "Założyciel jest gotów płacić za SaaS do cap table" | PRZEKONANIE — kluczowe, całkowicie niezbadane |
| "Rynek pre-seed/seed PL jest wystarczająco duży" | PRZEKONANIE — wymaga weryfikacji liczby nowych spółek zakładanych rocznie z intencją fundraisingu |

---

### Layer 2 — Hipotezy konkurujące

| Hipoteza | Prawdopodobieństwo | Co ją eliminuje / potwierdza |
| :---- | :---- | :---- |
| H1: Problem realny, ale rozwiązuje go prawnik — założyciel deleguje zamiast rozumieć | WYSOKIE | Wyeliminować przez wywiady: czy założyciele chcą rozumieć cap table samodzielnie, czy wolą "podpisać i zaufać prawnikowi" |
| H2: Narzędzie jest potrzebne, ale kanałem dystrybucji są kancelarie, nie foundrzy | ŚREDNIE | Sprawdzić: czy prawnicy używają dziś jakichkolwiek kalkulatorów cap table w pracy z klientami |
| H3: Problem realny, WTP istnieje, ale tylko w momencie rundy — poza nią produkt nie ma uzasadnienia płatnej subskrypcji | ŚREDNIE | Test: ile razy w roku przeciętny founder potrzebuje symulacji? Jeśli raz na rok — model freemium lub one-time payment, nie SaaS |
| H4 *(obala "oczywiste")*: Foundrzy polscy mają wystarczającą wiedzę o cap table — problem leży gdzie indziej (np. brak narzędzia do komunikacji z inwestorem, nie do rozumienia mechanizmów) | NISKIE-ŚREDNIE | Zapytać wprost: "Opisz ostatnią sytuację, gdy cap table był problemem. Co dokładnie Cię zablokowało?" |

---

### Layer 3 — Kalibracja pewności

| Twierdzenie | Pewność | Uzasadnienie |
| :---- | :---- | :---- |
| Zagraniczne narzędzia nie obsługują polskiego prawa | HIGH | Weryfikowalne przez product review Carta/Pulley — brak sp. z o.o., PLN, KRS |
| Założyciele używają Excela do cap table | HIGH | Potwierdzone wielokrotnie w rozmowach ekosystemowych |
| Założyciele chcą rozumieć mechanizmy sami | LOW | Żadnych danych — silne założenie, możliwy błąd projekcji |
| WTP dla SaaS cap table w Polsce istnieje | LOW | Brak precedensu rynkowego w Polsce — kluczowe ryzyko modelu |
| Edukacja inline jest wyróżnikiem produktowym | MED | Założenie UX — nie wiadomo czy użytkownicy to docenią czy ignorują |

⚠️ **Uwaga:** Dwa twierdzenia na LOW, jedno na MED bez potwierdzenia. To nie jest pessimizm — to rzetelność. Przy dwóch LOW w fundamentach biznesu (WTP i chęć samodzielności) produkt wymaga walidacji przed budowaniem.

---

### Layer 4 — Known Unknowns

| ❓ Pytanie | Dlaczego ważne dla biznesu | Jak zweryfikować |
| :---- | :---- | :---- |
| Czy założyciele chcą rozumieć cap table sami, czy delegować do prawnika? | Decyduje o tym czy ClearTable to narzędzie dla foundera czy dla kancelarii — dwa różne produkty i GTM | Wywiad z 6-8 founderami po rundzie seed: "Jak przygotowywałeś się do rozmów z VC o term sheecie?" |
| Jaki jest WTP dla SaaS cap table w Polsce? | Decyduje o viability modelu subskrypcyjnego — bez tego budujemy freemium bez ścieżki do revenue | Smoke test: landing page z ceną \+ przycisk "Zarejestruj się" — mierz CTR przed zbudowaniem produktu |
| Czy ból pojawia się jednorazowo (przy rundzie) czy regularnie? | Decyduje między modelem SaaS a one-time / freemium z płatnymi funkcjami premium | Wywiad: "Ile razy w ostatnim roku miałeś do czynienia z cap table?" |
| Czy prawnicy mogliby być kanałem dystrybucji? | Alternatywny GTM: B2B2C przez kancelarie zamiast direct-to-founder | Rozmowy z 3-5 prawnikami specjalizującymi się w startupach: jakich narzędzi używają |
| Jak duży jest rynek adresowalny w Polsce? | Decyduje o ceiling biznesu — ilu founderów rocznie przechodzi rundę i miałoby powód do użycia? | Desk research: dane KRS o nowych spółkach \+ raporty PFR/Startup Poland o rundach pre-seed/seed |

---

### Layer 5 — Falsyfikacja i pre-mortem

**Projekt nie wypalił po 12 miesiącach. Trzy najbardziej prawdopodobne przyczyny:**

1. **WTP okazało się zerowe.** Polscy foundrzy traktowali cap table jako zadanie prawnika i nie widzieli powodu by płacić za narzędzie, które i tak obsługuje kancelaria. Product-market fit nie istniał dla segmentu direct-to-founder.  
     
2. **Używalność jednorazowa zabiła SaaS.** Użytkownicy logowali się raz przy rundzie, po czym znikali na rok. Churn był 95%, model subskrypcyjny nie miał uzasadnienia. Nie zbadano tego przed wybraniem modelu monetyzacji.  
     
3. **Rynek był za mały.** Liczba polskich founderów aktywnie przechodzących rundę i gotowych zapłacić za SaaS okazała się zbyt mała, by zbudować powtarzalny revenue. TAM był przeceniany.

**Co zrobiłbym inaczej od początku:**

- Zwalidował WTP smoke testem przed napisaniem pierwszej linii kodu  
- Przeprowadził 10 wywiadów z founderami po rundzie zanim podjął decyzję o modelu monetyzacji  
- Przetestował hipotezę "kancelaria jako kanał" równolegle z hipotezą "direct-to-founder"  
- Wybrał model freemium z jasnym paywallem zamiast SaaS od pierwszego dnia

---

## CO DALEJ — TOP 3 PRIORYTETY DO DISCOVERY

Na podstawie BHC i DAE, przed rozmowami z Adamem (Week 2\) warto zweryfikować:

1. **WTP** — smoke test lub bezpośrednie pytanie o budżet w wywiadzie  
2. **Kto faktycznie używa** — founder sam czy przez prawnika? To zmienia wszystko  
3. **Częstotliwość problemu** — jednorazowe czy regularne? To decyduje o modelu

---

*Przykład: Bartek Narzelski / ClearTable PL* *Projekt ClearTable: cleartable.pl | Autor: Bartek Narzelski*

