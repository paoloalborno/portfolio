from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the CV page served by the local server
    page.goto("http://localhost:8000/pages/cv.html")

    # Wait for the graph container to be visible to ensure the D3 script has run
    graph_container = page.locator("#cv-graph")
    expect(graph_container).to_be_visible(timeout=10000)

    # Give the animations a moment to settle
    page.wait_for_timeout(1000)

    # Take a screenshot of the graph area
    page.screenshot(path="jules-scratch/verification/cv_graph_verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)