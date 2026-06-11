"""ClearTable PL — PROD incognito smoke test of the Core Flow at 375px.

magic-link login -> build cap table -> share -> open read-only token URL (incognito).
Magic link captured via mail.tm disposable mailbox API (no project secret needed).
Screenshots: screenshots/PROD-A..D at 375px width.

Run: python scripts/prod_walkthrough.py
"""
import json
import os
import re
import time
import urllib.request
import urllib.error
from playwright.sync_api import sync_playwright

BASE = os.environ.get("PROD_BASE", "https://cleartable-demo.vercel.app")
GM = "https://api.guerrillamail.com/ajax.php"
SHOT = os.path.join(os.path.dirname(__file__), "..", "screenshots")
os.makedirs(SHOT, exist_ok=True)


def gm(params):
    url = GM + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url)
    req.add_header("User-Agent", "Mozilla/5.0")
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode())


def make_mailbox():
    d = gm({"f": "get_email_address"})
    sid = d["sid_token"]
    user = f"ctfounder{int(time.time())}"
    d2 = gm({"f": "set_email_user", "email_user": user,
             "domain": "sharklasers.com", "sid_token": sid})
    addr = d2.get("email_addr") or f"{user}@sharklasers.com"
    print("MAILBOX", addr)
    return addr, sid


def get_magic_link(sid):
    for i in range(60):
        d = gm({"f": "check_email", "seq": "0", "sid_token": sid})
        for m in d.get("list", []):
            if str(m.get("mail_id")) == "1":  # welcome mail, skip
                continue
            full = gm({"f": "fetch_email", "email_id": m["mail_id"], "sid_token": sid})
            body = full.get("mail_body", "")
            mm = re.search(r'https?://[^\s"\'<>]*(?:verify|callback|token)[^\s"\'<>]*', body)
            if mm:
                return mm.group(0).replace("&amp;", "&")
        time.sleep(2)
    raise RuntimeError("No magic link in mailbox after 120s")


def shot(page, name):
    page.wait_for_timeout(400)
    p = os.path.join(SHOT, name)
    page.screenshot(path=p, full_page=True)
    print("SHOT", name)


with sync_playwright() as p:
    addr, mtok = make_mailbox()
    browser = p.chromium.launch(headless=True)
    # 375px — mobile width per goal.
    ctx = browser.new_context(viewport={"width": 375, "height": 812})
    page = ctx.new_page()

    # 1) LOGIN.
    page.goto(f"{BASE}/login")
    page.wait_for_load_state("networkidle")
    page.fill("#email", addr)
    page.click("button[type=submit]")
    page.wait_for_selector("text=Sprawdź skrzynkę", timeout=20000)
    print("OTP requested on prod")

    link = get_magic_link(mtok)
    print("LINK", link[:90])
    page.goto(link)
    page.wait_for_load_state("networkidle")
    print("LANDED", page.url)
    if "/dashboard" not in page.url:
        print("BODY:", page.locator("body").inner_text()[:300])
        raise SystemExit("LOGIN FAILED — not on /dashboard")
    print("logged in -> dashboard")

    # 2) CREATE.
    page.fill("#company_name", "Acme Robotics sp. z o.o.")
    page.click("button:has-text('Utwórz')")
    page.wait_for_url(re.compile(r".*/dashboard/[0-9a-f-]{36}$"), timeout=20000)
    page.wait_for_load_state("networkidle")
    print("editor", page.url)

    # 3) +shareholder 1.
    page.fill("#name", "Jan Kowalski")
    page.select_option("#type", "founder")
    page.fill("#shares", "7000")
    page.click("button:has-text('Dodaj wspólnika')")
    page.wait_for_selector("td:has-text('Jan Kowalski')", timeout=15000)

    # 4) +shareholder 2.
    page.fill("#name", "Fundusz Zalążkowy VC")
    page.select_option("#type", "vc")
    page.fill("#shares", "3000")
    page.click("button:has-text('Dodaj wspólnika')")
    page.wait_for_selector("td:has-text('Fundusz Zalążkowy VC')", timeout=15000)
    page.wait_for_load_state("networkidle")
    shot(page, "PROD-B-editor-375.png")

    # 5) SHARE.
    page.click("button:has-text('Udostępnij')")
    page.wait_for_selector("text=Read-only link", timeout=15000)
    page.wait_for_timeout(600)
    shot(page, "PROD-C-share-375.png")
    share_url = page.locator("[role=dialog] .num").first.inner_text().strip()
    print("SHARE_URL", share_url)

    # 6) dashboard list.
    page.goto(f"{BASE}/dashboard")
    page.wait_for_load_state("networkidle")
    shot(page, "PROD-A-dashboard-375.png")

    # 7) INCOGNITO public read-only.
    anon = browser.new_context(viewport={"width": 375, "height": 812})
    ap = anon.new_page()
    ap.goto(share_url)
    ap.wait_for_load_state("networkidle")
    edit_btns = ap.locator("button:has-text('Dodaj wspólnika')").count()
    has_table = ap.locator("td:has-text('Jan Kowalski')").count()
    print("anon edit_buttons:", edit_btns, "anon sees data:", has_table)
    shot(ap, "PROD-D-public-375.png")
    if edit_btns != 0 or has_table < 1:
        raise SystemExit("INCOGNITO read-only check FAILED")

    print("DONE OK", share_url)
    browser.close()
