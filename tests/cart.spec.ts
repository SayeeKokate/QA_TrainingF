
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; 
import { ProductsPage } from '../pages/ProductsPage'; 
import { CartPage } from '../pages/CartPage';

test('TC_007 Remove product from cart @cart', async ({ page }) => {

const loginPage = new LoginPage(page);
const productsPage = new ProductsPage(page);

await loginPage.goto();

await loginPage.login(
    'standard_user',
    'secret_sauce'
);

await productsPage.addBackpack();

await productsPage.removeBackpack();

await expect(
    page.locator('.shopping_cart_badge')
).toHaveCount(0);
});


test('TC_009 Verify products in cart @cart', async ({ page }) => {

const loginPage = new LoginPage(page);
const productsPage = new ProductsPage(page);

await loginPage.goto();

await loginPage.login(
    'standard_user',
    'secret_sauce'
);

await productsPage.addBackpack();

await productsPage.goToCart();

await expect(
    page.getByText('Sauce Labs Backpack')
).toBeVisible();
});

test('TC_013 Continue Shopping @cart', async ({ page }) => {

const loginPage = new LoginPage(page);
const productsPage = new ProductsPage(page);
const cartPage = new CartPage(page);

await loginPage.goto();

await loginPage.login(
    'standard_user',
    'secret_sauce'
);

await productsPage.addBackpack();

await productsPage.goToCart();

await cartPage.continueShopping();

await expect(page)
    .toHaveURL(/inventory.html/);
});