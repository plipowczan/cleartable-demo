"""ClearTable PL — dowód Core Flow: login → create → +2 wspólników → share → token URL.
Robi zrzuty ekranów A/B/C/D. Wymaga: dev na :3000, lokalny Supabase (Mailpit :54424)."""
import re
import sys
import time
import urllib.request
import urllib.parse
import json
import os
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
MAILPIT = "http://127.0.0.1:54424"
EMAIL = "founder@cleartable.test"
SHOT = os.path.join(os.path.dirname(__file__), "..", "screenshots")
os.makedirs(SHOT, exist_ok=True)


def mailpit(method, path):
    req = urllib.request.Request(f"{MAILPIT}{path}", method=method)
    with urllib.request.urlopen(req, timeout=10) as r:
        body = r.read().decode().strip()
        if not body:
            return {}
        try:
            return json.loads(body)
        except json.JSONDecodeError:
            return {"_raw": body}


def get_magic_link():
    for _ in range(40):
        msgs = mailpit("GET", "/api/v1/messages").get("messages", [])
        if msgs:
            mid = msgs[0]["ID"]
            msg = mailpit("GET", f"/api/v1/message/{mid}")
            text = (msg.get("Text") or "") + " " + (msg.get("HTML") or "")
            m = re.search(r'https?://[^\s"\'<>]*(?:verify|token)[^\s"\'<>]*', text)
            if m:
                return m.group(0).replace("&amp;", "&")
        time.sleep(0.5)
    raise RuntimeError("Brak magic linku w Mailpit")


def shot(page, name):
    page.wait_for_timeout(400)
    p = os.path.join(SHOT, name)
    page.screenshot(path=p, full_page=True)
    print("SHOT", name)


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 900})
    page = ctx.new_page()

    # Czyść skrzynkę.
    try:
        mailpit("DELETE", "/api/v1/messages")
    except Exception as e:
        print("mailpit clear warn:", e)

    # 1) LOGIN — magic link.
    page.goto(f"{BASE}/login")
    page.wait_for_load_state("networkidle")
    page.fill("#email", EMAIL)
    page.click("button[type=submit]")
    page.wait_for_selector("text=Sprawdź skrzynkę", timeout=15000)
    print("magic link sent")

    link = get_magic_link()
    print("LINK", link[:80])
    page.goto(link)
    page.wait_for_load_state("networkidle")
    print("LANDED", page.url)
    if "/dashboard" not in page.url:
        # retry: maybe stale email; ostatnia wiadomość = najnowsza
        print("not on dashboard, body:", page.locator("body").inner_text()[:200])
        raise SystemExit("login failed")
    print("logged in -> dashboard")

    # 2) CREATE cap table.
    page.fill("#company_name", "Acme Robotics sp. z o.o.")
    page.click("button:has-text('Utwórz')")
    page.wait_for_url(re.compile(r".*/dashboard/[0-9a-f-]{36}$"), timeout=15000)
    page.wait_for_load_state("networkidle")
    editor_url = page.url
    print("editor", editor_url)

    # 3) Add shareholder 1 (founder 7000).
    page.fill("#name", "Jan Kowalski")
    page.select_option("#type", "founder")
    page.fill("#shares", "7000")
    page.click("button:has-text('Dodaj wspólnika')")
    page.wait_for_selector("td:has-text('Jan Kowalski')", timeout=10000)

    # 4) Add shareholder 2 (vc 3000).
    page.fill("#name", "Fundusz Zalążkowy VC")
    page.select_option("#type", "vc")
    page.fill("#shares", "3000")
    page.click("button:has-text('Dodaj wspólnika')")
    page.wait_for_selector("td:has-text('Fundusz Zalążkowy VC')", timeout=10000)
    page.wait_for_load_state("networkidle")

    # Screen B — editor z live %.
    shot(page, "B-editor.png")

    # 5) SHARE — modal (Screen C).
    page.click("button:has-text('Udostępnij')")
    page.wait_for_selector("text=Read-only link", timeout=10000)
    page.wait_for_timeout(500)
    shot(page, "C-share-modal.png")

    # Wyciągnij URL z modala.
    url_el = page.locator("[role=dialog] .num").first
    share_url = url_el.inner_text().strip()
    print("SHARE_URL", share_url)

    # 6) Screen A — dashboard z listą (badge Udostępniony).
    page.goto(f"{BASE}/dashboard")
    page.wait_for_load_state("networkidle")
    shot(page, "A-dashboard.png")

    # 7) Screen D — publiczny widok w INCOGNITO (bez sesji).
    anon = browser.new_context(viewport={"width": 1280, "height": 900})
    anon_page = anon.new_page()
    anon_page.goto(share_url)
    anon_page.wait_for_load_state("networkidle")
    # Dowód braku edycji: brak przycisków akcji.
    has_edit = anon_page.locator("button:has-text('Dodaj wspólnika')").count()
    print("anon edit buttons:", has_edit)
    shot(anon_page, "D-public.png")

    print("DONE")
    browser.close()
