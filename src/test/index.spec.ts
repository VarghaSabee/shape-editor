import { test, expect } from '@playwright/test'

test('should app start', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/')
    // Find the app name
    await expect(page.locator('span')).toContainText('DoShape')
  
})