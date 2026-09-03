import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Login', () => {
  test('успешный логин с валидными данными', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // после успешного логина должны попасть на страницу товаров
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('неуспешный логин с неверным паролем', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    // должно появиться сообщение об ошибке
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });
});