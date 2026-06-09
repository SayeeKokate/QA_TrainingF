import { test, expect } from '@playwright/test';
const USERNAME = 'standard_user'; const PASSWORD = 'secret_sauce';

async function loginAndAddProduct(page: any) {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill(USERNAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
}

// TC_010 Checkout with valid details 
test('TC_010 Valid checkout', 
    async ({ page }) => {
        await loginAndAddProduct( page);
        await page.locator('#first-name').fill('Sayee');
        await page.locator('#last-name').fill('Kokate');
        await page.locator('#postal-code').fill('400');
        await page.locator('#continue').click();
        await expect(page).toHaveURL(/checkout-step-two/);
    });

// TC_011 Checkout with missing first name 
test('TC_011 Checkout with missing first name', 
    async ({ page }) => {
        await loginAndAddProduct(page);
        await page.locator('#last-name').fill('Kokate');
        await page.locator('#postal-code').fill('400001');
        await page.locator('#continue').click();
        await expect(page.locator('[data-test="error"]'))
        .toContainText('First Name is required');
    });

// TC_012 Checkout with missing postal code 
test('TC_012 Checkout with missing postal code', 
    async ({ page }) => {
        await loginAndAddProduct(page);
        await page.locator('#first-name').fill('Sayee');
        await page.locator('#last-name').fill('Kokate');
        await page.locator('#continue').click();
        await expect(page.locator('[data-test="error"]'))
        .toContainText('Postal Code is required');
    });