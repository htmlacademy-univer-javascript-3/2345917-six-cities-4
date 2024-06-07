import { test, expect } from '@playwright/test';

test('ensure the proper functioning of the login form', async ({ page }) => {

    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'abc@abc.com');
    await page.fill('input[name="password"]', 'gtg54gerg4');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    expect(page.url()).toBe('http://localhost:5173/');

    expect(await page.isVisible('.header__nav-link--profile')).toBe(true);
    expect(await page.isVisible('.header__favorite-count')).toBe(true);

    await page.click('.header__signout');
    expect(page.url()).toBe('http://localhost:5173/');

    await page.click('.header__nav-link');
    await page.waitForSelector('.page__main--login');

    await page.fill('input[name="email"]', 'abc@abc');
    await page.fill('input[name="password"]', 'gtggerg');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    await expect(page).toHaveURL('http://localhost:5173/login');
});
