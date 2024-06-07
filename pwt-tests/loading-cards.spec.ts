import { test, expect } from '@playwright/test';

test('ensure the correct loading of cards from the server', async ({ page }) => {

    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card');

    const cardElements = await page.locator('.cities__card');
    const cardElementsCount = await cardElements.count();

    expect(cardElementsCount).toBeGreaterThan(0);
    expect(cardElementsCount).toBeLessThanOrEqual(20);

    for (let i = 0; i < cardElementsCount; i++) {
        const currentCardElement = cardElements.nth(i);
        await expect(currentCardElement.locator('.place-card__image')).toHaveAttribute('src', /https:\/\/.+[.]jpg/);
        await expect(currentCardElement.locator('.place-card__price')).toHaveText(/^\€\d+/);
        await expect(currentCardElement.locator('.place-card__rating')).toBeVisible();
    }
});
