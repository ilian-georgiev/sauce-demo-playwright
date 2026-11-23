import { Page, expect } from '@playwright/test';

// Page Object for the product list and the cart.
export class InventoryPage {
  constructor(private page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByTestId('title')).toHaveText('Products');
  }

  // slug example: 'sauce-labs-backpack'
  async addToCart(slug: string) {
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async removeFromCart(slug: string) {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async expectCartCount(count: number) {
    await expect(this.page.getByTestId('shopping-cart-badge')).toHaveText(String(count));
  }

  async expectCartEmpty() {
    // The badge disappears completely when the cart is empty
    await expect(this.page.getByTestId('shopping-cart-badge')).toHaveCount(0);
  }

  async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async expectCartContains(productName: string) {
    await expect(this.page.getByTestId('inventory-item-name')).toHaveText(productName);
  }
}
