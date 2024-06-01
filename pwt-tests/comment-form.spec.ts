import { test, expect } from '@playwright/test';

test('the use of the comment form is possible only for users who have gone through the authentication process', async ({ page }) => {

    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card');
    await page.locator('.place-card__name').first().click();
    await page.waitForSelector('.offer__name');
    expect(await page.isVisible('.reviews__form')).toBe(false);

    await page.click('.header__nav-link');
    await expect(page).toHaveURL('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'abc@abc.com');
    await page.fill('input[name="password"]', 'gtg54gerg4');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    expect(page.url()).toBe('http://localhost:5173/');
    await page.waitForSelector('.cities__card');
    await page.locator('.place-card__name').first().click();
    await page.waitForSelector('.offer__name');
    expect(await page.isVisible('.reviews__form')).toBe(true);

    await page.fill('[name="review"]', 'This is a test review that meets the length requirement. (50 characters)!!!');
    await page.getByTitle('perfect').click();

    await page.click('.reviews__submit');
    await page.waitForTimeout(2000);
    await expect(page.locator('.reviews__item').first()).toContainText('This is a test review that meets the length requirement. (50 characters)!!!');
});
