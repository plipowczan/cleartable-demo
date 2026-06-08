# VB MVP Template — Startup Builders #2, Week 3

Szablon repozytorium do **forka** na 7-dniowy build MVP. Trzyma w jednym miejscu Twój kontekst z W1/W2, prompty jako komendy i reguły dla agenta. Działa dla **obu ścieżek** (Builder i Tech).

> Po co repo, skoro robię w Lovable? Bo to magazyn kontekstu (artefakty W1/W2 + brand + prd) i — jeśli włączysz GitHub sync w Lovable — miejsce na log decyzji. Track Tech pracuje w nim bezpośrednio.

---

## 1. Załóż swoje repo z tego szablonu (5 min)

1. Kliknij **"Use this template" → Create a new repository** (zielony przycisk u góry) → nazwij jak projekt (np. `clear-table-mvp`). To czystsze niż fork — dostajesz własną historię, bez powiązania z oryginałem.
2. Sklonuj lokalnie (Track Tech) albo zostaw na GitHub (Track Builder + sync).
3. Wrzuć artefakty z poprzednich tygodni do `context/` (patrz niżej).
4. **Track Tech:** otwórz repo w Claude Code — komendy `/brand`, `/prd`, `/reguly`, `/milestones` są od razu dostępne (siedzą w `.claude/commands/`).
5. **Track Builder:** prompty masz w `.claude/commands/*.md` jako czysty markdown — kopiuj treść do okna Lovable/v0/czatu.

## 2. Co gdzie wrzucić

```
context/
├─ w1/          ← artefakty Week 1 (Bartosz): bhc.md, deep-analysis.md, mom-test-notes.md
├─ w2/          ← artefakty Week 2 (Damian): icp.md, positioning.md, insights-playbook.md, landing-brief.md
└─ brand.md     ← generowany komendą /brand (krok 1) — NIE wrzucasz ręcznie

prd.md          ← generowany /prd (krok 2)
goals.md        ← generowany /milestones (krok 4) + Twój log decyzji
CLAUDE.md       ← reguły projektu (Track Tech) — generowane /reguly (krok 3)
AGENTS.md       ← to samo dla innych narzędzi agentowych (otwarty standard)
README.md       ← ten plik; po deployu dopisz URL produkcyjny
```

**Zasada:** struktura folderów jest **odwzorowana w `CLAUDE.md` i w komendach** — agent wie, że kontekst W1 siedzi w `context/w1/`, brand w `context/brand.md` itd. Nie zmieniaj nazw bez aktualizacji `CLAUDE.md`.

## 3. Kolejność (każdy krok konsumuje poprzedni)

| Krok | Komenda | Output | Konsumuje |
|---|---|---|---|
| 1 | `/brand` | `context/brand.md` | `context/w2/` (ICP, positioning) |
| 2 | `/prd` | `prd.md` | `context/w1/` + `context/w2/` + `brand.md` |
| 3 | `/reguly` | `CLAUDE.md` / `AGENTS.md` / Lovable Knowledge | `prd.md` + `brand.md` |
| 4 | `/milestones` | `goals.md` | `prd.md` |

Pełny opis każdej fazy: **playbook W3** (osobny dokument z materiałów programu).

## 4. Track Tech — skille z shared-skills (opcjonalnie)

Zamiast komendy `/prd` możesz użyć pełnego skilla `prd`, a w Fazie 4 skilla `/prepare-goal`. Instalacja w Claude Code:

```
/plugin marketplace add 200iqlabs/shared-skills
/plugin install 200iqlabs-agent-skills
```

Alternatywnie jako **submoduł** repo (jeśli wolisz mieć skille wersjonowane razem z projektem):

```
git submodule add https://github.com/200iqlabs/shared-skills shared-skills
```

Komendy w `.claude/commands/` to **uniwersalne odpowiedniki** skilli — działają bez instalacji, w każdym narzędziu. Jeśli skill jest w shared-skills (`prd`, `prepare-goal`) → użyj skilla. Jeśli nie ma (brand, reguły, milestones) → komenda z tego repo.

## 5. Log decyzji

`goals.md` ma sekcję **Log decyzji** — dopisuj 1 linię na sesję ("M3: wybrałem flow bez koszyka, bo §3 ma jeden produkt").
- **Track Tech:** poproś agenta `dopisz decyzje z tej sesji do goals.md`.
- **Track Builder:** Lovable nie zapisze do pliku z czatu — prowadź ręcznie, albo commituj przez GitHub sync.

---

_Pytania w trakcie tygodnia → grupa programu. Bloker > 30 min = pisz._
