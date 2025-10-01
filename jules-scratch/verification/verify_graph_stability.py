import os
from playwright.sync_api import sync_playwright, expect

def run_graph_stability_verification(playwright):
    repo_path = os.getcwd()
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_default_timeout(10000)

    # --- Navigate to the CV Page ---
    cv_page_url = f"file://{repo_path}/pages/cv.html"
    page.goto(cv_page_url)

    # --- Step 1: Expand the root node to reveal the main sections ---
    root_node = page.locator('g.node[data-category="root"]').first
    expect(root_node).to_be_visible()
    root_node.click()

    # --- Add a static wait to ensure the initial expansion animation is complete ---
    # The D3 animation duration is 750ms, so waiting 1 second is safe.
    page.wait_for_timeout(1000)

    # Define locators using stable data-category attributes
    experience_node = page.locator('g.node[data-category="section_experience"]')
    education_node = page.locator('g.node[data-category="section_education"]')
    certifications_node = page.locator('g.node[data-category="section_certifications"]')

    # Wait for all section nodes to be visible
    expect(experience_node).to_be_visible()
    expect(education_node).to_be_visible()
    expect(certifications_node).to_be_visible()

    # --- Step 2: Get the initial position of the "Education" node ---
    initial_transform = education_node.get_attribute('transform')
    print(f"Initial 'Education' node transform: {initial_transform}")

    # --- Step 3: Expand the "Experience" node ---
    experience_node.click()
    # Wait for a child of the experience node to appear to ensure the animation is complete
    senior_engineer_node = page.locator('g.node', has_text="Senior S/W & Data Engineer")
    expect(senior_engineer_node).to_be_visible()
    print("Expanded 'Experience' node.")

    # --- Step 4: Get the new position of the "Education" node ---
    final_transform = education_node.get_attribute('transform')
    print(f"Final 'Education' node transform: {final_transform}")

    # --- Step 5: Assert that the position has NOT changed ---
    expect(education_node).to_have_attribute('transform', initial_transform)
    print("Assertion successful: 'Education' node position did not change.")

    browser.close()

with sync_playwright() as playwright:
    run_graph_stability_verification(playwright)

print("Graph stability verification completed successfully.")