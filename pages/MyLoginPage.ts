import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class MyLoginPage {
  constructor(private page: Page) { }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');

  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  async expectError(message: string) {
    await expect(this.page.getByTestId('error')).toContainText(message);
  }

  async dismissError() {
    const dismissButton = this.page.getByRole('button', {name: 'Dismiss error'});
    await expect(dismissButton).toBeVisible();
    await dismissButton.click();
    await expect(this.page.getByTestId('error')).not.toBeVisible();
  }

}

