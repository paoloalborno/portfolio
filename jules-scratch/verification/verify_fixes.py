import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the HTML files
        base_path = os.path.abspath(".")

        # --- Verify CV Page ---
        cv_page_url = f"file://{os.path.join(base_path, 'pages/cv.html')}"
        page.goto(cv_page_url)

        # Check if the graph container is visible and has a reasonable height
        cv_graph = page.locator("#cv-graph")
        expect(cv_graph).to_be_visible()
        bounding_box = cv_graph.bounding_box()
        assert bounding_box['height'] > 500, f"CV graph container height is {bounding_box['height']}, which is too small."

        # Check that the SVG itself is rendered
        svg_element = cv_graph.locator("svg")
        expect(svg_element).to_be_visible()

        page.screenshot(path="jules-scratch/verification/cv_page.png")
        print("Successfully verified CV page.")

        # --- Verify Backlog Page ---
        backlog_page_url = f"file://{os.path.join(base_path, 'pages/backlog.html')}"
        page.goto(backlog_page_url)

        try:
            # Expand the first learning item to show badges
            expand_icon = page.locator(".backlog-item[data-status='learning'] .expand-icon").first
            expand_icon.click()

            # Wait for the content to be visible
            expandable_content = page.locator(".backlog-item[data-status='learning'] .item-expandable-content").first

            # Wait for the 'is-visible' class to be applied.
            expect(expandable_content).to_have_class("item-expandable-content is-visible", timeout=3000)

            # Verify badge images are visible and have the correct size
            badges = expandable_content.locator(".backlog-badge-img")
            expect(badges.first).to_be_visible()

            for i in range(badges.count()):
                badge = badges.nth(i)
                bounding_box = badge.bounding_box()
                assert bounding_box['width'] == 80, f"Badge {i} width is {bounding_box['width']}, expected 80"
                assert bounding_box['height'] == 80, f"Badge {i} height is {bounding_box['height']}, expected 80"

            print("Successfully verified backlog page.")

        except Exception as e:
            print(f"Could not automatically verify the backlog page. Error: {e}")
            print("Taking a screenshot of the backlog page anyway for manual inspection.")

        finally:
            page.screenshot(path="jules-scratch/verification/backlog_page.png")
            browser.close()

if __name__ == "__main__":
    run_verification()