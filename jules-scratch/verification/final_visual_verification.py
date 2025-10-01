import os
from playwright.sync_api import sync_playwright, expect

def run_final_visual_verification(playwright):
    repo_path = os.getcwd()
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_default_timeout(20000) # Generous timeout

    # --- Navigate to the CV Page ---
    cv_page_url = f"file://{repo_path}/pages/cv.html"
    page.goto(cv_page_url)
    print("Navigated to CV page.")

    # --- 1. Initial State ---
    root_node = page.locator('g.node[data-category="root"]').first
    expect(root_node).to_be_visible()
    page.screenshot(path="jules-scratch/verification/FINAL_01_initial.png")
    print("Captured FINAL_01_initial.png")

    # --- 2. Expand Root Node ---
    root_node.hover()
    root_node.click()

    experience_node = page.locator('g.node[data-category="section_experience"]')
    expect(experience_node).to_be_visible()
    page.wait_for_timeout(1000) # Static wait for animation to settle
    page.screenshot(path="jules-scratch/verification/FINAL_02_root_expanded.png")
    print("Captured FINAL_02_root_expanded.png")

    # --- 3. Expand a Child Node ---
    experience_node.hover()
    experience_node.click()

    senior_engineer_node = page.locator('g.node', has_text="Senior S/W & Data Engineer")
    expect(senior_engineer_node).to_be_visible()
    page.wait_for_timeout(1000) # Static wait for animation to settle
    page.screenshot(path="jules-scratch/verification/FINAL_03_child_expanded.png")
    print("Captured FINAL_03_child_expanded.png")

    browser.close()

with sync_playwright() as playwright:
    run_final_visual_verification(playwright)

print("\nFinal visual verification screenshots captured successfully.")