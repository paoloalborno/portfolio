import os
from playwright.sync_api import sync_playwright, expect

def run_refactored_graph_verification(playwright):
    repo_path = os.getcwd()
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_default_timeout(15000) # Increased timeout for safety

    # --- Navigate to the CV Page ---
    cv_page_url = f"file://{repo_path}/pages/cv.html"
    page.goto(cv_page_url)
    print("Navigated to CV page.")

    # --- 1. Initial State Verification ---
    root_node = page.locator('g.node[data-category="root"]').first
    experience_node = page.locator('g.node[data-category="section_experience"]')
    senior_engineer_node = page.locator('g.node', has_text="Senior S/W & Data Engineer")

    # The root should be visible initially.
    expect(root_node).to_be_visible()
    print("Initial state: Root node is visible.")

    # The root's children are collapsed by default, so expand it.
    # Use hover() to ensure the node is stable before clicking.
    root_node.hover()
    root_node.click()
    expect(experience_node).to_be_visible()
    print("Initial state: Root expanded, direct children are now visible.")

    # Grandchildren should NOT be visible yet.
    expect(senior_engineer_node).not_to_be_visible()
    print("Initial state: Grandchildren nodes are not visible. Correct.")

    # --- 2. Expansion & Stability Test ---
    education_node = page.locator('g.node[data-category="section_education"]')
    expect(education_node).to_be_visible()

    # Record the initial position of the 'Education' node
    initial_transform = education_node.get_attribute('transform')
    print(f"Stability test: Initial 'Education' node transform: {initial_transform}")

    # Expand the 'Experience' node
    experience_node.hover()
    experience_node.click()

    # Verify the grandchild is now visible
    expect(senior_engineer_node).to_be_visible()
    print("Stability test: Expanded 'Experience' node, grandchild is now visible.")

    # Verify the 'Education' node's position has not changed
    final_transform = education_node.get_attribute('transform')
    print(f"Stability test: Final 'Education' node transform: {final_transform}")
    expect(education_node).to_have_attribute('transform', initial_transform)
    print("Stability test: Assertion successful. 'Education' node position is stable.")

    # --- 3. Collapse Test ---
    experience_node.hover()
    experience_node.click()
    expect(senior_engineer_node).not_to_be_visible()
    print("Collapse test: Grandchild node is hidden again. Correct.")

    # --- 4. Modal Test on Leaf Node ---
    certifications_node = page.locator('g.node[data-category="section_certifications"]')
    certifications_node.hover()
    certifications_node.click()

    aws_cert_node = page.locator('g.node', has_text="Cert. AWS Solutions Architect")
    expect(aws_cert_node).to_be_visible()

    aws_cert_node.hover()
    aws_cert_node.click()

    modal = page.locator("#cv-modal")
    expect(modal).to_be_visible()
    print("Modal test: Modal is visible after clicking a leaf node.")

    modal_title = page.locator("#modal-title")
    expect(modal_title).to_have_text("Cert. AWS Solutions Architect")
    print("Modal test: Modal title is correct.")

    browser.close()

with sync_playwright() as playwright:
    run_refactored_graph_verification(playwright)

print("\nRefactored graph verification completed successfully!")