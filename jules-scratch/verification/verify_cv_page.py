from playwright.sync_api import sync_playwright, expect

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # 1. Navigate to the local CV page
        page.goto("file:///app/pages/cv.html")

        # 2. Wait for the D3 graph to render by looking for a node
        expect(page.locator("g.node").first).to_be_visible(timeout=10000)

        # 3. Take a screenshot of the entire page
        page.screenshot(path="jules-scratch/verification/cv_page.png")

        browser.close()

if __name__ == "__main__":
    main()