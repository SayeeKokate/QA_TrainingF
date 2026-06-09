// import { test, expect } from '@playwright/test';
// const USERNAME = 'standard_user'; const PASSWORD = 'secret_sauce';

// async function loginAndAddProduct(page: any) {
//     await page.goto('https://www.saucedemo.com/');
//     await page.locator('#user-name').fill(USERNAME);
//     await page.locator('#password').fill(PASSWORD);
//     await page.locator('#login-button').click();
//     await page.locator('#add-to-cart-sauce-labs-backpack').click();
//     await page.locator('.shopping_cart_link').click();
//     await page.locator('#checkout').click();
// }

// // TC_010 Checkout with valid details 
// test('TC_010 Valid checkout', 
//     async ({ page }) => {
//         await loginAndAddProduct( page);
//         await page.locator('#first-name').fill('Sayee');
//         await page.locator('#last-name').fill('Kokate');
//         await page.locator('#postal-code').fill('400');
//         await page.locator('#continue').click();
//         await expect(page).toHaveURL(/checkout-step-two/);
//     });

// // TC_011 Checkout with missing first name 
// test('TC_011 Checkout with missing first name', 
//     async ({ page }) => {
//         await loginAndAddProduct(page);
//         await page.locator('#last-name').fill('Kokate');
//         await page.locator('#postal-code').fill('400001');
//         await page.locator('#continue').click();
//         await expect(page.locator('[data-test="error"]'))
//         .toContainText('First Name is required');
//     });

// // TC_012 Checkout with missing postal code 
// test('TC_012 Checkout with missing postal code', 
//     async ({ page }) => {
//         await loginAndAddProduct(page);
//         await page.locator('#first-name').fill('Sayee');
//         await page.locator('#last-name').fill('Kokate');
//         await page.locator('#continue').click();
//         await expect(page.locator('[data-test="error"]'))
//         .toContainText('Postal Code is required');
//     });

import { test, expect } from '@playwright/test'; 
import { LoginPage } from '../pages/LoginPage'; 
import { ProductsPage } from '../pages/ProductsPage'; 
import { CartPage } from '../pages/CartPage'; 
import { CheckoutPage } from '../pages/CheckoutPage';

async function loginAndReachCheckout(page: any) {

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

await cartPage.checkout();
}

// TC_010 
test('TC_010 Valid checkout @checkout', async ({ page }) => {


const checkoutPage = new CheckoutPage(page);

await loginAndReachCheckout(page);

await checkoutPage.fillDetails(
    'Sayee',
    'Kokate',
    '400001'
);

await checkoutPage.continueCheckout();

await expect(page)
    .toHaveURL(/checkout-step-two/);
});

// TC_011 
test('TC_011 Checkout with missing first name @negative', async ({ page }) => {

const checkoutPage = new CheckoutPage(page);

await loginAndReachCheckout(page);

await checkoutPage.fillDetails(
    '',
    'Kokate',
    '400001'
);

await checkoutPage.continueCheckout();

await checkoutPage.verifyValidationMessage(
    'First Name is required'
);
});

// TC_012 
test('TC_012 Checkout with missing postal code @negative', async ({ page }) => {

const checkoutPage = new CheckoutPage(page);

await loginAndReachCheckout(page);

await checkoutPage.fillDetails(
    'Sayee',
    'Kokate',
    ''
);

await checkoutPage.continueCheckout();

await checkoutPage.verifyValidationMessage(
    'Postal Code is required'
);
});