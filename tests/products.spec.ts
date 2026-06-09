// 

import { test, expect } from '@playwright/test'; 
import { LoginPage } from '../pages/LoginPage'; 
import { ProductsPage } from '../pages/ProductsPage';

test('TC_005 Product list visible @regression', async ({ page }) => {

const loginPage = new LoginPage(page);

await loginPage.goto();

await loginPage.login(
    'standard_user',
    'secret_sauce'
);

await expect(
    page.locator('.inventory_item')
).toHaveCount(6);
});

test('TC_006 Add product to cart @cart', async ({ page }) => {

const loginPage = new LoginPage(page);
const productsPage = new ProductsPage(page);

await loginPage.goto();

await loginPage.login(
    'standard_user',
    'secret_sauce'
);

await productsPage.addBackpack();

await productsPage.verifyCartCount('1');
});

test('TC_008 Add multiple products @cart', async ({ page }) => {

const loginPage = new LoginPage(page);
const productsPage = new ProductsPage(page);

await loginPage.goto();

await loginPage.login(
    'standard_user',
    'secret_sauce'
);

await productsPage.addBackpack();

await page
    .locator('#add-to-cart-sauce-labs-bike-light')
    .click();

await productsPage.verifyCartCount('2');
});

