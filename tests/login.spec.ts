// import { test, expect } from '@playwright/test';
// import { users } from '../test-cases/users';

// // TC_001 Login page should load 
// test('Login page should load', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await expect(page).toHaveTitle(/Swag Labs/);
// });

// // TC_002 Valid user should be able to login 
// test('Valid user should login', async ({ page }) => {
//     const standardUser = users.find(
//         user => user.type === 'standard'
//     );
//     await page.goto('https://www.saucedemo.com/');
//     await page.fill('#user-name', standardUser!.username);
//     await page.fill('#password', standardUser!.password);
//     await page.click('#login-button');
//     await expect(page).toHaveURL(/inventory/);
// });
 
// // TC_003 Invalid password should show error 
// test('Invalid password should show error', async ({ page }) => {

//     const standardUser = users.find(
//         user => user.type === 'standard'
//     );
//     await page.goto('https://www.saucedemo.com/');
//     await page.fill('#user-name', standardUser!.username);
//     await page.fill('#password', 'wrongpassword');
//     await page.click('#login-button');
//     await expect(
//         page.locator('[data-test="error"]')).toBeVisible();
//     });

// // TC_004 Locked user should not be able to login 
// test('Locked user should not login', async ({ page }) => {
//     const lockedUser = users.find(
//         user => user.type === 'locked'
//     );
//     await page.goto('https://www.saucedemo.com/');
//     await page.fill('#user-name', lockedUser!.username);
//     await page.fill('#password', lockedUser!.password);
//     await page.click('#login-button');
//     await expect(
//         page.locator('[data-test="error"]')
//     ).toContainText('locked out');
// });


import { test, expect } from '@playwright/test'; import { users } from '../test-cases/users'; import { LoginPage } from '../pages/LoginPage';

// TC_001 
test('TC_001 Login page should load @smoke', async ({ page }) => {

const loginPage = new LoginPage(page);

await loginPage.goto();

await expect(page).toHaveTitle(/Swag Labs/);
});

// TC_002 
test('TC_002 Valid user should login @smoke', async ({ page }) => {

const standardUser = users.find(
    user => user.type === 'standard'
);

const loginPage = new LoginPage(page);

await loginPage.goto();

await loginPage.login(
    standardUser!.username,
    standardUser!.password
);

await expect(page).toHaveURL(/inventory/);
});

// TC_003 
test('TC_003 Invalid password should show error @negative', async ({ page }) => {

const standardUser = users.find(
    user => user.type === 'standard'
);

const loginPage = new LoginPage(page);

await loginPage.goto();

await loginPage.login(
    standardUser!.username,
    'wrongpassword'
);

await loginPage.verifyErrorMessage(
    'Username and password do not match'
);
});

// TC_004 
test('TC_004 Locked user should not login @negative', async ({ page }) => {

const lockedUser = users.find(
    user => user.type === 'locked'
);

const loginPage = new LoginPage(page);

await loginPage.goto();

await loginPage.login(
    lockedUser!.username,
    lockedUser!.password
);

await loginPage.verifyErrorMessage(
    'locked out'
);
});