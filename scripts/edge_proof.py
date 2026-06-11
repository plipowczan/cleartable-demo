"""ClearTable PL — DOWÓD stanów brzegowych/błędów (cel sesji).
Każdy przypadek sprawdzany w INCOGNITO (osobny kontekst, bez sesji):
  1. 1 wspólnik = 100,00%
  2. nieprawidłowy token -> strona "niedostępny", HTTP != 500
  3. odwołany token -> "niedostępny" (revoke wyłącza dostęp)
  4. /share strictly read-only (brak przycisków edycji)
  5. suma udziałów 0 -> stan pusty, BEZ 'NaN'
Wymaga: dev :3000 na LOKALNYM supabase, Mailpit :54424, SERVICE_ROLE_KEY w env.
"""
import re, time, json, os, urllib.request
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
MAILPIT = "http://127.0.0.1:54424"
REST = "http://127.0.0.1:54421/rest/v1"
SERVICE = os.environ["SERVICE_ROLE_KEY"]
EMAIL = "edge-founder@cleartable.test"
SHOT = os.path.join(os.path.dirname(__file__), "..", "screenshots")
os.makedirs(SHOT, exist_ok=True)

results = []
def check(name, ok, detail=""):
    results.append((name, ok, detail))
    print(("PASS" if ok else "FAIL"), name, "-", detail)

def mailpit(method, path):
    req = urllib.request.Request(f"{MAILPIT}{path}", method=method)
    with urllib.request.urlopen(req, timeout=10) as r:
        b = r.read().decode().strip()
        return json.loads(b) if b else {}

def get_magic_link():
    for _ in range(40):
        msgs = mailpit("GET", "/api/v1/messages").get("messages", [])
        if msgs:
            msg = mailpit("GET", f"/api/v1/message/{msgs[0]['ID']}")
            text = (msg.get("Text") or "") + " " + (msg.get("HTML") or "")
            m = re.search(r'https?://[^\s"\'<>]*(?:verify|token)[^\s"\'<>]*', text)
            if m:
                return m.group(0).replace("&amp;", "&")
        time.sleep(0.5)
    raise RuntimeError("Brak magic linku")

def rest(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(f"{REST}{path}", method=method, data=data, headers={
        "apikey": SERVICE, "Authorization": f"Bearer {SERVICE}",
        "Content-Type": "application/json", "Prefer": "return=representation",
    })
    with urllib.request.urlopen(req, timeout=10) as r:
        b = r.read().decode().strip()
        return json.loads(b) if b else []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 900})
    page = ctx.new_page()
    try:
        mailpit("DELETE", "/api/v1/messages")
    except Exception as e:
        print("mailpit clear:", e)

    # LOGIN
    page.goto(f"{BASE}/login")
    page.wait_for_load_state("networkidle")
    page.fill("#email", EMAIL)
    page.click("button[type=submit]")
    page.wait_for_selector("text=Sprawdź skrzynkę", timeout=15000)
    page.goto(get_magic_link())
    page.wait_for_load_state("networkidle")
    assert "/dashboard" in page.url, f"login failed: {page.url}"

    # CREATE + 1 wspólnik (case 1: 100%)
    page.fill("#company_name", "Solo Founder sp. z o.o.")
    page.click("button:has-text('Utwórz')")
    page.wait_for_url(re.compile(r".*/dashboard/[0-9a-f-]{36}$"), timeout=15000)
    editor_url = page.url
    cap_id = editor_url.rsplit("/", 1)[1]
    page.fill("#name", "Anna Nowak")
    page.select_option("#type", "founder")
    page.fill("#shares", "5000")
    page.click("button:has-text('Dodaj wspólnika')")
    page.wait_for_selector("td:has-text('Anna Nowak')", timeout=10000)
    page.wait_for_load_state("networkidle")

    # SHARE -> token
    page.click("button:has-text('Udostępnij')")
    page.wait_for_selector("text=Read-only link", timeout=10000)
    share_url = page.locator("[role=dialog] .num").first.inner_text().strip()
    token = share_url.rsplit("/share/", 1)[1]
    print("SHARE_URL", share_url, "TOKEN", token)
    page.keyboard.press("Escape")

    # ── CASE 1 + 4: incognito, 100% + read-only ──
    anon = browser.new_context()
    ap = anon.new_page()
    resp = ap.goto(share_url)
    ap.wait_for_load_state("networkidle")
    body = ap.locator("body").inner_text()
    check("1 wspólnik = 100,00%", "100,00%" in body, f"status={resp.status}")
    edit_btns = ap.locator("button:has-text('Dodaj wspólnika')").count()
    del_btns = ap.locator("button[aria-label^='Usuń']").count()
    forms = ap.locator("form").count()
    check("/share read-only (brak edycji)",
          edit_btns == 0 and del_btns == 0 and forms == 0,
          f"add={edit_btns} del={del_btns} forms={forms}")
    ap.screenshot(path=os.path.join(SHOT, "E1-share-100pct.png"), full_page=True)
    anon.close()

    # ── CASE 2: nieprawidłowy token ──
    anon = browser.new_context()
    ap = anon.new_page()
    resp = ap.goto(f"{BASE}/share/deadbeefdeadbeefdeadbeef0000")
    ap.wait_for_load_state("networkidle")
    body = ap.locator("body").inner_text()
    check("nieprawidłowy token -> niedostępny, nie 500",
          resp.status != 500 and "niedostępny" in body.lower(),
          f"status={resp.status}")
    ap.screenshot(path=os.path.join(SHOT, "E2-invalid-token.png"), full_page=True)
    anon.close()

    # ── CASE 5: suma 0 -> stan pusty, bez NaN (PATCH shares=0 service role) ──
    rest("PATCH", f"/shareholders?cap_table_id=eq.{cap_id}", {"shares": 0})
    anon = browser.new_context()
    ap = anon.new_page()
    resp = ap.goto(share_url)
    ap.wait_for_load_state("networkidle")
    body = ap.locator("body").inner_text()
    check("suma 0 -> stan pusty, bez NaN",
          resp.status == 200 and "NaN" not in body and "jeszcze pusta" in body,
          f"status={resp.status} hasNaN={'NaN' in body}")
    ap.screenshot(path=os.path.join(SHOT, "E5-zero-empty.png"), full_page=True)
    anon.close()
    # przywróć udziały
    rest("PATCH", f"/shareholders?cap_table_id=eq.{cap_id}", {"shares": 5000})

    # ── CASE 3: revoke wyłącza dostęp ──
    page.bring_to_front()
    page.goto(editor_url)
    page.wait_for_load_state("networkidle")
    page.click("button:has-text('Pokaż link')")
    page.wait_for_selector("text=Read-only link", timeout=10000)
    page.click("button:has-text('Odwołaj dostęp')")
    page.wait_for_timeout(1500)  # server action + revalidate
    anon = browser.new_context()
    ap = anon.new_page()
    resp = ap.goto(share_url)
    ap.wait_for_load_state("networkidle")
    body = ap.locator("body").inner_text()
    check("odwołany token -> niedostępny, nie 500",
          resp.status != 500 and "niedostępny" in body.lower(),
          f"status={resp.status}")
    ap.screenshot(path=os.path.join(SHOT, "E3-revoked.png"), full_page=True)
    anon.close()

    browser.close()

print("\n==== PODSUMOWANIE ====")
allok = all(ok for _, ok, _ in results)
for name, ok, detail in results:
    print(("PASS" if ok else "FAIL"), "-", name)
print("WYNIK:", "WSZYSTKO PASS" if allok else "SĄ FAIL")
raise SystemExit(0 if allok else 1)
