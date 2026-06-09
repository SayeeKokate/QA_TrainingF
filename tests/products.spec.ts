import { test, expect } from '@playwright/test';
import { products } from '../test-cases/products';

test('TC_005 Product list visible', 
    async({ page}) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect( page.locator('.inventory_item')).toHaveCount(6);
    });

test('TC_006 Add product to cart',
     async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce'); 
        await page.locator('#login-button').click();
        await page.locator('#add-to-cart-sauce-labs-backpack').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    }); 



test('TC_008 Add multiple products', 
    async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await page.locator('#add-to-cart-sauce-labs-backpack').click();
        await page.locator('#add-to-cart-sauce-labs-bike-light').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    }); 

test('TC_009 Verify products in cart',
    async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await page.locator('#add-to-cart-sauce-labs-backpack').click();
        await page.locator('.shopping_cart_link').click();
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    });