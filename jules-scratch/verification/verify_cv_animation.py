import os
from playwright.sync_api import sync_playwright, expect

def run_cv_verification(playwright):
    repo_path = os.getcwd()
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_default_timeout(10000)

    # --- Verify CV Page Graph Animation ---
    cv_page_url = f"file://{repo_path}/pages/cv.html"
    page.goto(cv_page_url)

    # 1. Wait for the initial graph to be ready and take a screenshot
    root_node = page.locator('g.node').first
    expect(root_node).to_be_visible()
    page.screenshot(path="jules-scratch/verification/01_cv_initial_state.png")

    # 2. Click the root node to expand it
    root_node.click()

    # 3. Wait for a child node to appear and take a second screenshot
    # We'll wait for the "Esperienze Lavorative" node to be visible
    child_node = page.locator('text=Esperienze Lavorative')
    expect(child_node).to_be_visible()
    page.screenshot(path="jules-scratch/verification/02_cv_expanded_state.png")

    browser.close()

with sync_playwright() as playwright:
    run_cv_verification(playwright)

print("CV animation verification screenshots captured successfully.")