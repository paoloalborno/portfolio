import os
from playwright.sync_api import sync_playwright, expect, Page

def run_verification(page: Page):
    """
    Navigates to the CV and Backlog pages to verify the implemented fixes.
    """
    base_url = "http://localhost:8000"

    # 1. Verify CV Graph Visibility
    cv_url = f"{base_url}/pages/cv.html"
    page.goto(cv_url, wait_until="load")

    # Wait for the page to be fully initialized
    expect(page.locator("body.page-initialized")).to_be_visible(timeout=10000)

    # Wait for the SVG element to be present
    cv_graph_svg = page.locator("#cv-graph svg")
    expect(cv_graph_svg).to_be_visible()

    # Log dimensions for debugging
    graph_container_box = page.locator("#cv-graph").bounding_box()
    svg_box = cv_graph_svg.bounding_box()
    print(f"CV Graph Container Bounding Box: {graph_container_box}")
    print(f"SVG Element Bounding Box: {svg_box}")

    page.wait_for_timeout(1000)

    page.screenshot(path="jules-scratch/verification/01_cv_graph_verification.png")
    print("Successfully captured CV graph screenshot.")

    # 2. Verify Backlog Page Changes
    backlog_url = f"{base_url}/pages/backlog.html"
    page.goto(backlog_url, wait_until="load")

    # Wait for the page to be fully initialized
    expect(page.locator("body.page-initialized")).to_be_visible(timeout=10000)

    # Expand the "DevOps Essentials" item using a more stable locator
    devops_item = page.locator('.backlog-item:has([data-translate-key="backlog.devops_essentials_title"])')
    devops_item.locator(".expand-icon").click()
    expect(devops_item.locator(".item-expandable-content")).to_be_visible()

    # Expand the "LangChain, Ollama & LLMs" item
    langchain_item = page.locator('.backlog-item:has([data-translate-key="backlog.langchain_title"])')
    langchain_item.locator(".expand-icon").click()
    expect(langchain_item.locator(".item-expandable-content")).to_be_visible()

    # Take a single screenshot showing both expanded items
    page.screenshot(path="jules-scratch/verification/02_backlog_page_verification.png")
    print("Successfully captured Backlog page screenshot.")


def main():
    """
    Main function to run the Playwright verification script.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run_verification(page)
            print("Verification script executed successfully.")
        except Exception as e:
            print(f"An error occurred during verification: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    main()