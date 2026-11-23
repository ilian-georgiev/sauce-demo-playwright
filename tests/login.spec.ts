import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// SauceDemo shows these public demo accounts on its own login page.
const PASSWORD = 'secret_sauce';

test.describe('Login', () => {
  test('valid user can log in and sees the product list', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user', PASSWORD);

    await inventory.expectLoaded();
  });

  test('locked out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('locked_out_user', PASSWORD);

    await login.expectError('this user has been locked out');
  });

  test('wrong password shows an error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'wrong_password');

    await login.expectError('do not match any user');
  });

  test('empty username shows an error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('', PASSWORD);

    await login.expectError('Username is required');
  });
});
