import os
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    # Get the absolute path of the current working directory
    repo_path = os.getcwd()

    # --- Setup ---
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    # General delay to allow JS to execute, especially for file:// URLs
    page.set_default_timeout(10000) # 10 seconds

    # --- 1. Verify Research Page ---
    research_page_url = f"file://{repo_path}/pages/research.html"
    page.goto(research_page_url)
    page.wait_for_load_state('networkidle')
    # Wait for a translated element to be visible with the correct text
    expect(page.locator('h2[data-translate-key="research.h2"]')).to_contain_text('Ricerca & Pubblicazioni')
    page.screenshot(path="jules-scratch/verification/01_research_page.png")

    # --- 2. Verify CV Page Graph ---
    cv_page_url = f"file://{repo_path}/pages/cv.html"
    page.goto(cv_page_url)
    page.wait_for_load_state('networkidle')
    # Wait for D3 graph to render by waiting for the first node to be visible
    expect(page.locator("g.node").first).to_be_visible()
    page.screenshot(path="jules-scratch/verification/02_cv_page.png")

    # --- 3. Verify About Page ---
    about_page_url = f"file://{repo_path}/pages/about.html"
    page.goto(about_page_url)
    page.wait_for_load_state('networkidle')
    # Wait for a translated element to be visible with the correct text
    expect(page.locator('h2[data-translate-key="about.h2"]')).to_contain_text('Chi Sono')
    page.screenshot(path="jules-scratch/verification/03_about_page.png")

    # --- 4. Verify SQL Toolkit Page ---
    sql_toolkit_page_url = f"file://{repo_path}/pages/projects/project-sql-toolkit.html"
    page.goto(sql_toolkit_page_url)
    page.wait_for_load_state('networkidle')
    # Wait for a translated element to be visible with the correct text
    expect(page.locator('h2[data-translate-key="project_sql_toolkit.h2"]')).to_contain_text('SQL Reverse Engineering Toolkit')
    page.screenshot(path="jules-scratch/verification/04_sql_toolkit_page.png")

    # --- Teardown ---
    browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)

print("Verification screenshots captured successfully.")