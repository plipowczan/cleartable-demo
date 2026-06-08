# Week 2 — Micro-ICP + weryfikacja (ClearTable PL)

> **Projekt demo:** ClearTable PL (cap table SaaS) — workbook ClearTable, AI Startup Builders #2
> **Źródło:** wyciąg z workbooka Damiana (output, prompty instruktażowe pominięte)

# OUTPUT\_Micro-ICP

### **KROK 1 — EKSTRAKCJA TWARDYCH DANYCH**

Zgodnie z twardymi dowodami z dostarczonych materiałów, bez nadinterpretacji:

1. **Rdzeń problemu:** ClearTable to aplikacja webowa dla polskich startupów (m.in. sp. z o.o., P.S.A.), która rozwiązuje problem chaosu w zarządzaniu strukturą udziałową, niezrozumienia mechanizmów rozwodnienia w trakcie rund inwestycyjnych oraz asymetrii wiedzy między founderami a funduszami VC. System ma eliminować nieefektywną komunikację i obniżać koszty obsługi prawnej poprzez automatyzację i kontekstową edukację.  
2. **Autentyczne frustracje:**  
   * *"Przez dwa tygodnie wymienialiśmy się mailami z trzema stronami, bo stary Excel funduszu rozjechał się na zaokrągleniach groszowych w KRS."*  
   * *"Jak fundusz przysłał Term Sheet, to przez trzy dni zarywałem nocki, oglądając YouTube i czytając blogi ze Stanów, żeby zrozumieć, czym jest liquidation preference 1x non-participating. Czułem się jak debil na spotkaniach."*  
   * *"Gdyby istniało coś, co generuje mi gotowy plik do sytemu KRS po zmianie udziałów, dałbym za to parę stówek jednorazowo. Ale miesięczny abonament za trzymanie tabelki? No drobiu nie gubię na ulicy, bez przesady."*  
3. **Obecne alternatywy:**  
   * **Rozwiązania prowizoryczne:** Rozbudowane, wieloletnie arkusze Excel lub Google Sheets (zarówno autorskie szablony prawników, jak i funduszy), które wymagają ręcznej edycji przy każdej zmianie.  
   * **Niedopasowana konkurencja zagraniczna:** Platformy typu Carta czy Pulley, które pomimo zaawansowania nie obsługują specyfiki polskiego Kodeksu Spółek Handlowych (np. operują na "akcjach" zamiast "udziałach" w sp. z o.o.) ani waluty PLN.

### **KROK 2 — SEGMENTACJA MICRO-ICP**

Dane pokazują, że "polski startup na etapie pre-seed/seed" to zbyt szeroki konstrukt. Rynek dzieli się na kompletnie odmienne ekosystemy bólu.

## **MICRO-ICP 1: "Zarządca Chaosu" (Post-Seed Start-up CEO)**

### **1\. Współrzędne Demograficzno-Kontekstowe (Core Identity)**

* **Segment / Kontekst:** Dojrzały founder zarządzający spółką, w której "Excel przestał się spinać" ze względu na liczbę interesariuszy po obu stronach stołu.  
* **Firmografia / Demografia:** Startupy w modelu np. Marketplace lub SaaS (18+ miesięcy na rynku), działające jako spółka z o.o., posiadające w strukturze (cap table) aniołów biznesu, fundusze pre-seed oraz seed. Zazwyczaj wspierane przez ułamkowego (fractional) CFO.  
* **Ograniczenia Środowiskowe:** Krytyczny brak czasu na operacyjny back-and-forth z prawnikami, brak jednej, aktualnej "wersji prawdy" dla wszystkich inwestorów.  
* **Poziom Świadomości:** Świadomy problemu i gotowy na zakup (wie, ile kosztuje go chaos komunikacyjny).

### **2\. Katalizator Zmiany (The Trigger)**

* **Wydarzenie Makro/Mikro:** Próba wdrożenia pierwszego programu ESOP dla pracowników lub przygotowanie infrastruktury prawnej pod rundę Serii A.  
* **Punkt Krytyczny (Tipping Point):** Moment, w którym autorski Excel funduszu wykazuje błędy na zaokrągleniach groszowych, co blokuje rejestrację w KRS i wymusza wielotygodniową wymianę dziesiątek maili między spółką, inwestorami i prawnikiem.

### **3\. Dynamika Decyzyjna (Decision Ecosystem)**

* **Użytkownik vs. Nabywca:** CEO jest głównym Nabywcą (akceptuje fakturę dla świętego spokoju), natomiast głównym Użytkownikiem operacyjnym może być on sam lub wspomagający go CFO.  
* **Główny Influencer:** Lead Investor z poprzedniej rundy, który domaga się transparentnego dostępu do cap table bez opóźnień.  
* **WTP (Willingness to Pay):** 9/10. Founder zwerbalizował bezpośrednią gotowość do zapłaty (porównując to do budżetów HR: 300 euro/msc), o ile narzędzie wyeliminuje przepływ maili i zapewni jedno źródło prawdy dla wszystkich zalogowanych stron. Gotowy na model SaaS.  
* **Bariery Zakupowe (Blockers):** Brak zgody kluczowych aniołów biznesu na logowanie się do nowej, nieznanej platformy w celu weryfikacji udziałów.

### **4\. Status Quo i "Protezy" (Workarounds)**

* **Główny Konkurent:** Prywatny Google Sheet udostępniany do wglądu inwestorom, połączony z tradycyjną, fakturowaną na godziny obsługą prawną.  
* **Domowe Sposoby:** Blokowanie edycji w arkuszach dla wszystkich poza founderem i CFO, ręczne generowanie wyciągów i synchronizacja danych poprzez pliki PDF wysyłane mailowo.

## **MICRO-ICP 2: "Techniczny Delegator" (Pre-Seed Solo-Founder)**

### **1\. Współrzędne Demograficzno-Kontekstowe (Core Identity)**

* **Segment / Kontekst:** Założyciel o profilu inżynieryjnym, dla którego papierologia finansowo-prawna to zło konieczne odciągające od budowy produktu.  
* **Firmografia / Demografia:** Wczesny etap rozwoju (bootstrapped / poszukiwanie pre-seed lub seed rzędu 300k \- 1.5 mln PLN), np. branża Hardware/IoT/AI, polska sp. z o.o..  
* **Ograniczenia Środowiskowe:** Niskie budżety operacyjne, całkowity brak kompetencji w zakresie finansów korporacyjnych i niechęć do czytania żargonu prawnego.  
* **Poziom Świadomości:** Świadomy istnienia problemu ("nic z tego nie rozumiem"), ale poszukujący ucieczki/automatyzacji, a nie edukacji.

### **2\. Katalizator Zmiany (The Trigger)**

* **Wydarzenie Makro/Mikro:** Otrzymanie fizycznego dokumentu (Term Sheet) od pierwszego funduszu lub zderzenie się z niezgodnością globalnego oprogramowania (Carta) z polskim rynkiem.  
* **Punkt Krytyczny (Tipping Point):** Otrzymanie rachunku z kancelarii na 25 tysięcy złotych za negocjacje i zamknięcie prostej rundy, połączone z poczuciem bycia "debilem na spotkaniach" ze względu na niezrozumienie mechanizmów takich jak liquidation preference.

### **3\. Dynamika Decyzyjna (Decision Ecosystem)**

* **Użytkownik vs. Nabywca:** Solo-founder pełni obie role z przymusu. Wykonuje tę pracę tylko dlatego, że nie stać go jeszcze na dyrektora finansowego.  
* **Główny Influencer:** Zaufany doradca prawny lub "kumpel ze Stanów", który podrzuca szablony lub rekomenduje rozwiązania.  
* **WTP (Willingness to Pay):** 8/10 dla transakcyjnego jednorazowego zakupu generatora dokumentów, ale 1/10 dla subskrypcji SaaS. Ból pojawia się tylko w momencie domykania rundy; poza tym okresem founder zapomina o istnieniu cap table.  
* **Bariery Zakupowe (Blockers):** Subskrypcyjny model cenowy (SaaS jest tu potężną czerwoną flagą) oraz zmuszanie do przechodzenia przez ściany tekstu edukacyjnego.

### **4\. Status Quo i "Protezy" (Workarounds)**

* **Główny Konkurent:** Oddelegowanie całego procesu do prawnika i ślepa akceptacja warunków ("prawnik rzuci na to okiem i powie czy jest OK").  
* **Domowe Sposoby:** Gorączkowe nocne przeszukiwanie amerykańskich blogów i YouTube'a, trzymanie szczątkowej struktury własnościowej w plikach tekstowych np. w Notion, korzystanie ze skopiowanych od znajomych arkuszy kalkulacyjnych.

## **MICRO-ICP 3: "Nocny Operator Excela" (Prawnik Transakcyjny VC)**

### **1\. Współrzędne Demograficzno-Kontekstowe (Core Identity)**

* **Segment / Kontekst:** Prawnik zmuszony do pełnienia roli kalkulatora finansowego dla swoich nieszukających wiedzy klientów technologicznych.  
* **Firmografia / Demografia:** Partnerzy i prawnicy w butikowych kancelariach prawnych (np. warszawskich), wyspecjalizowani w obsłudze transakcji VC/M\&A dla startupów z ponad 10-letnim doświadczeniem.  
* **Ograniczenia Środowiskowe:** Własny czas, którego nie mogą efektywnie zafakturować na kliencie w przypadku powtarzalnych, mechanicznych przeliczeń (klienci traktują to jako "prostą matematykę").  
* **Poziom Świadomości:** Bardzo wysoki. Dokładnie wie, jak niedoskonałe są obecne zagraniczne platformy i jak wiele czasu traci na ręczną obsługę zapytań founderów.

### **2\. Katalizator Zmiany (The Trigger)**

* **Wydarzenie Makro/Mikro:** Startupy klienta wchodzą w fazę zaawansowanych negocjacji Term Sheetu, co generuje dziesiątki scenariuszy "what-if" (np. zmiana rozmiaru puli ESOP).  
* **Punkt Krytyczny (Tipping Point):** Odbieranie telefonów od founderów o 22:00 z żądaniem natychmiastowego wyliczenia nowego scenariusza rozwodnienia, co kosztuje prawnika 40 minut darmowej, nieopłacanej pracy w autorskim Excelu.

### **3\. Dynamika Decyzyjna (Decision Ecosystem)**

* **Użytkownik vs. Nabywca:** Prawnik (Partner) może wykupić licencję dla swojej kancelarii, aby udostępniać bezpieczne środowisko do symulacji swoim klientom (founderom), zdejmując z siebie ciężar nocnych telefonów.  
* **Główny Influencer:** Działania funduszy VC narzucające tempo transakcji.  
* **WTP (Willingness to Pay):** 6/10. Narzędzie musiałoby idealnie odzwierciedlać polski Kodeks Spółek Handlowych, ponieważ ryzyko błędu prawnego po stronie kancelarii jest ogromne.  
* **Bariery Zakupowe (Blockers):** Potencjalny brak zaufania do poprawności algorytmów aplikacji względem wymogów sądów rejestrowych (KRS).

### **4\. Status Quo i "Protezy" (Workarounds)**

* **Główny Konkurent:** Amerykańskie systemy typu Pulley, które są natychmiast odrzucane z powodu braku obsługi sp. z o.o. i rejestru KRS.  
* **Domowe Sposoby:** Szablony Google Sheets budowane, modyfikowane i rozwijane ręcznie przez 8 lat, traktowane jako główne, niezawodne narzędzie pracy.

### **KROK 3 — BEACHHEAD MARKET**

**Wybór bezwzględny:** MICRO-ICP 1: "Zarządca Chaosu" (Post-Seed Scale-up CEO)

Aplikując logikę operacyjną w modelu *Fast & Light*, celujemy w segment generujący najszybszą trakcję bez konieczności zmiany bazowego modelu biznesowego.

**1\. Dlaczego ten segment wygrywa (point-by-point):**

* **Walidacja Modelu SaaS:** Jako jedyni zgłaszają ciągły, nawracający ból (zarządzanie *ongoing*, ESOP, komunikacja z aniołami), który uzasadnia klasyczną subskrypcję MRR/ARR. Profil 2 (Pre-Seed) ostro odrzuca subskrypcję, widząc wartość tylko w opłacie transakcyjnej.  
* **Natychmiastowe WTP:** Posiadają budżety z wcześniejszych rund i wyrażają gotowość płacenia na poziomie standardowych narzędzi SaaS ("płacę 300 euro za narzędzia HR... płaciłbym bez mrugnięcia okiem").  
* **Brak konieczności "edukacji inline":** Rozwiązujemy twardy problem organizacyjno-komunikacyjny, a nie problem braku wiedzy. Ci founderzy przeszli już chrzest bojowy — wiedzą, czego nie wiedzą, i chcą infrastruktury, a nie kursu.

**2\. Realistyczne okno czasowe do 10 płacących klientów:** 21 do 30 dni od startu. Ekosystem jest gęsty. Scrapujesz dane z KRS i Crunchbase w poszukiwaniu polskich sp. z o.o., które zamknęły rundę Seed od 12 do 18 miesięcy temu. Uruchamiasz wysoce spersonalizowany Cold Outreach. Triggerem jest pytanie o "aktualizację ESOP przed Serią A i rozjazdy groszowe w Excelach od VC". Rozwiązanie oferuje natychmiastowe skrócenie czasu synchronizacji z kilkunastu dni do jednego.

**3\. Jedno ryzyko do wyeliminowania przed zaangażowaniem zasobów:** **IT Compliance i Prywatność Danych.** Skoro targetujemy founderów, którzy mają na pokładzie inwestorów instytucjonalnych (VC), wymóg bezpieczeństwa danych jest bezkompromisowy. Zanim poprosisz o wgranie historycznej tabeli kapitalizacji do chmury, musisz przejść twardą walidację pod kątem prawnym i technologicznym — w przeciwnym razie fundusze zawetują to narzędzie na poziomie due diligence operacyjnego. Wyeliminuj obawy o wyciek danych udziałowych poprzez odpowiednią architekturę i politykę prywatności.



---

# OUTPUT\_Weryfikacja Micro-ICP

| Element | Odpowiedź |
| :---- | :---- |
| **Klasyfikacja rynku** | **SWEET SPOT, ale na dolnej granicy** |
| Szacowana liczba prospektów | 100–180 realnie pasujących kont. Punkt wyjścia bottom-up: 109 rund seed w Polsce w 2024 r. i 134 rundy seed w 2025 r., czyli łącznie 243 świeżo finansowane konta seed w ostatnich dwóch latach.[1](https://manus.im/app/XMXgoWZBd0VRyjxf01P36A#user-content-fn-1)[2](https://manus.im/app/XMXgoWZBd0VRyjxf01P36A#user-content-fn-2) Po odfiltrowaniu do polskich sp. z o.o., z wieloma inwestorami, 18+ miesięcy na rynku, triggerem ESOP / Series A i realnym chaosem cap table zostaje prawdopodobnie około 40–75% tej puli. |
| Czy da się zdobyć 10–50 klientów? | TAK dla 10–30; BRAK DANYCH dla 50\. Przy 100–180 prospektach zdobycie 10 klientów oznacza 6–10% penetracji segmentu, co jest wykonalne jako beachhead. Zdobycie 50 klientów oznaczałoby 28–50% penetracji, czyli bardzo ambitny wynik i wymagałoby potwierdzenia, że segment jest bliżej 180–300 kont niż 100\. |
| Szacowany ACV (annual contract value) / pricing | Bazowo ok. 3 600 EUR ARR, przy założeniu z profilu, że buyer porównuje wartość do narzędzi SaaS za ok. 300 EUR miesięcznie. Konserwatywnie: 1 200 EUR ARR. Optymistycznie: 6 000 EUR ARR. To jest estymacja z deklarowanego WTP, nie twardy pricing rynkowy. |
| Szacowany revenue pool | Konserwatywny: 100 kont × 1 200 EUR \= 120 000 EUR ARR. Bazowy: 140 kont × 3 600 EUR \= 504 000 EUR ARR. Optymistyczny: 180 kont × 6 000 EUR \= 1 080 000 EUR ARR. To jest sensowny beachhead revenue pool, ale nie samodzielnie duży rynek venture-scale. |
| Główne ryzyko sizingu | Ryzyko zawyżenia liczby prospektów przez mylenie „wszystkich startupów po seedzie” z „post-seed sp. z o.o. z realnie skomplikowanym cap table”. Publiczne dane pokazują aktywność VC, ale nie pokazują wprost liczby spółek z aniołami, funduszem pre-seed, seedem, ESOP-em, fractional CFO i nadchodzącą Serią A. |
| Jeśli za mały — co poszerzyć | Jeżeli lista nazwanych kont spadnie poniżej 100, należy poszerzyć do prawników transakcyjnych VC i butikowych kancelarii jako kanału / buyer segmentu albo do wszystkich polskich spółek VC-backed po pierwszej rundzie instytucjonalnej, nie tylko SaaS / marketplace. Drugie rozszerzenie to spółki P.S.A. i startupy z polskimi founderami, ale holdingiem zagranicznym. |
| Jeśli za duży — co zawęzić | Segment nie wygląda na za duży. Jeśli jednak w praktyce outreach pokaże heterogeniczność, zawęziłbym go do: polska sp. z o.o., runda seed zamknięta 12–24 miesiące temu, co najmniej jeden VC i co najmniej dwóch aniołów, przygotowanie ESOP lub Series A w ciągu 6–12 miesięcy. |
| **Najważniejszy test sizingu w 7 dni** | **Zbudować ręcznie lub półautomatycznie listę 150 nazwanych spółek spełniających kryteria: polska sp. z o.o., seed / post-seed, finansowanie w latach 2024–2026, co najmniej jeden inwestor instytucjonalny, prawdopodobny trigger ESOP / Series A. Jeśli w 7 dni nie da się znaleźć minimum 100 nazwanych, kontaktowalnych kont, segment trzeba zdegradować do ZA MAŁY albo NIEZWERYFIKOWANY.** |

Ocena sześciu kryteriów jest następująca.

 Segment da się policzyć bottom-up, ponieważ można zacząć od publicznych transakcji VC i kolejno filtrować po etapie, formie prawnej, inwestorach oraz triggerze. 

Minimum 100–300 prospektów jest częściowo realne: próg 100 wygląda osiągalnie, ale próg 300 prawdopodobnie nie, jeśli trzymamy się bardzo ostrego Micro-ICP. 

Pierwszych 10–50 klientów: 10–30 jest realistyczne rozmiarowo, 50 wymagałoby albo bardzo wysokiej penetracji, albo poszerzenia segmentu. 

Revenue pool na poziomie około 0,5 mln EUR ARR w scenariuszu bazowym jest wystarczający na beachhead, ale zbyt mały jako pełny rynek docelowy. 

Segment nie jest zbyt szeroki, bo opisuje konkretny etap, strukturę prawną, rodzaj chaosu i trigger zakupowy. Ekspansja istnieje logicznie: do pre-seed founderów przez produkty transakcyjne, do kancelarii VC jako buyerów / kanału oraz do szerszego rynku spółek technologicznych zarządzających udziałami i ESOP-em.

**Werdykt: Ten rynek jest dobrym beachheadem pod względem wielkości, ale tylko jako wąski rynek startowy, nie jako końcowy TAM. Największą niewiadomą jest to, ile z publicznie widocznych seed-funded startupów faktycznie ma złożony cap table, wielu interesariuszy i trigger ESOP / Series A.** 

**Najszybciej rozstrzygnie to 7-dniowy test polegający na zbudowaniu listy 100–150 nazwanych kont spełniających pełne kryteria Micro-ICP.**

## **Footnotes**

