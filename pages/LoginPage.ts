import { Page, expect } from '@playwright/test';

// Page Object: all knowledge about the login page lives in this one file.
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.getByTestId('username').fill(username);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-button').click();
  }

  async expectError(message: string) {
    await expect(this.page.getByTestId('error')).toContainText(message);
  }
}
