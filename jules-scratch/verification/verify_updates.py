import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        base_url = "http://localhost:8000"

        # Verify Ollama Project Page
        await page.goto(f'{base_url}/pages/projects/project-ollama-agent.html')
        await page.wait_for_selector('#d3-graph-ollama-container svg')
        await page.wait_for_timeout(1000)  # Wait for D3 animations
        graph_element = page.locator('#d3-graph-ollama-container')
        await graph_element.screenshot(path='jules-scratch/verification/ollama_project_page.png')

        # Verify Riassunti Page
        await page.goto(f'{base_url}/pages/riassunti.html')
        await expect(page.locator('h1')).to_have_text('Riassunti dei Progetti')

        # Expand the summary and take a screenshot
        await page.locator('#ollama-summary-header').click()
        await page.wait_for_timeout(500) # wait for animation
        await page.screenshot(path='jules-scratch/verification/riassunti_page_expanded.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())