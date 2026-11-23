import { test, expect } from '@playwright/test';
import { MyLoginPage } from '../pages/MyLoginPage';





// test('valid user can log in', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.getByPlaceholder('Username').fill('standard_user');
//     await page.getByPlaceholder('Password').fill('secret_sauce');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
// });


test('login page opens', async ({ page }) => {

    const login = new MyLoginPage(page);
    await login.goto();
    await expect(page.getByRole('button', {name: 'Login'})).toBeVisible();

});

test('successful login', async ({ page }) => {

    const login = new MyLoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
});

test('wrong username shows an error', async ({ page }) => {

    const login = new MyLoginPage(page);
    await login.goto();
    await login.login('standard_user1', 'secret_sauce');
    await login.expectError('Epic sadface: Username and password do not match any user in this service');
});

test('error message can be dismissed', async ({ page }) => {

    const login = new MyLoginPage(page);
    await login.goto();
    await login.login('standard_user1', 'secret_sauce');
    await login.dismissError();
    
});











// test.describe('logged in user', () => {

//     test.beforeEach(async ({ page }) => {
//         await page.goto('https://www.saucedemo.com/');
//         await page.getByPlaceholder('Username').fill('standard_user');
//         await page.getByPlaceholder('Password').fill('secret_sauce');
//         await page.getByRole('button', { name: 'Login' }).click();

//     });

//     test('item successfully added to cart', async ({ page }) => {
//         await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
//         await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
//     });

//     test('item successfully removed from cart', async ({ page }) => {
//         await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
//         await page.getByTestId('remove-sauce-labs-backpack').click();
//         await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

//     });

//     //   // flaky test
//     //   test('cart shows the added product - FLAKY', async ({ page }) => {
//     //   await page.goto('https://www.saucedemo.com/');
//     //   await page.getByPlaceholder('Username').fill('standard_user');
//     //   await page.getByPlaceholder('Password').fill('secret_sauce');
//     //   await page.getByRole('button', { name: 'Login' }).click();
//     //   await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
//     //   await page.getByTestId('shopping-cart-link').click();
//     //   await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
//     //   await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
//     // });

// });

