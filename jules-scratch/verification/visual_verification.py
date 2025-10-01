import os
from playwright.sync_api import sync_playwright, expect

def run_visual_verification(playwright):
    repo_path = os.getcwd()
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_default_timeout(10000)

    # --- Navigate to the CV Page ---
    cv_page_url = f"file://{repo_path}/pages/cv.html"
    page.goto(cv_page_url)
    print("Navigated to CV page.")

    # --- 1. Initial State ---
    # Wait for the root node to be ready.
    root_node = page.locator('g.node[data-category="root"]').first
    expect(root_node).to_be_visible()
    page.screenshot(path="jules-scratch/verification/01_refactor_initial.png")
    print("Captured 01_refactor_initial.png")

    # --- 2. Expand Root Node ---
    root_node.click()
    page.wait_for_timeout(1000) # Wait for animation
    page.screenshot(path="jules-scratch/verification/02_refactor_root_expanded.png")
    print("Captured 02_refactor_root_expanded.png")

    # --- 3. Expand a Child Node ---
    experience_node = page.locator('g.node[data-category="section_experience"]')
    experience_node.click()
    page.wait_for_timeout(1000) # Wait for animation
    page.screenshot(path="jules-scratch/verification/03_refactor_child_expanded.png")
    print("Captured 03_refactor_child_expanded.png")

    browser.close()

with sync_playwright() as playwright:
    run_visual_verification(playwright)

print("\nVisual verification screenshots captured successfully.")