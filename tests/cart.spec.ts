import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const PRODUCT_SLUG = 'sauce-labs-backpack';
const PRODUCT_NAME = 'Sauce Labs Backpack';

test.describe('Cart', () => {
  let inventory: InventoryPage;

  // Runs before every test: each test starts logged in on the product list
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await inventory.expectLoaded();
  });

  test('added product shows in the cart badge and in the cart', async () => {
    await inventory.addToCart(PRODUCT_SLUG);

    // Checks the real result (badge count + the product in the cart),
    // not only that a button was clicked.
    await inventory.expectCartCount(1);
    await inventory.openCart();
    await inventory.expectCartContains(PRODUCT_NAME);
  });

  test('removed product disappears and the cart is empty', async () => {
    await inventory.addToCart(PRODUCT_SLUG);
    await inventory.expectCartCount(1);

    await inventory.removeFromCart(PRODUCT_SLUG);

    await inventory.expectCartEmpty();
  });
});
