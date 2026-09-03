import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Cart', () => {
  test('добавление товара в корзину', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // добавляем первый товар в корзину
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // проверяем, что счётчик корзины показывает 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('оформление заказа целиком', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    await page.click('[data-test="finish"]');

    // проверяем сообщение об успешном заказе
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});