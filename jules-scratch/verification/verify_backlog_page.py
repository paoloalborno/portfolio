from playwright.sync_api import sync_playwright, expect

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # 1. Navigate to the local backlog page
        page.goto("file:///app/pages/backlog.html")

        # 2. Find the "DevOps Essentials" tile and the expand icon within it
        devops_tile = page.locator(".backlog-item", has_text="DevOps Essentials for Data Engineering")
        expand_icon = devops_tile.locator(".expand-icon")

        # 3. Click the expand icon to show the details
        expand_icon.click()

        # 4. Wait for the badges to be visible
        badges_container = devops_tile.locator(".backlog-badges")
        expect(badges_container).to_be_visible(timeout=5000)

        # 5. Take a screenshot of the expanded tile
        devops_tile.screenshot(path="jules-scratch/verification/backlog_page.png")

        browser.close()

if __name__ == "__main__":
    main()