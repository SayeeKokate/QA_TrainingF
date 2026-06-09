import { Page, expect } from '@playwright/test';

export class ProductsPage {

constructor(private page: Page) {}

async addBackpack() {
    await this.page
        .locator('#add-to-cart-sauce-labs-backpack')
        .click();
}

async removeBackpack() {
    await this.page
        .locator('#remove-sauce-labs-backpack')
        .click();
}

async verifyCartCount(count: string) {
    await expect(
        this.page.locator('.shopping_cart_badge')
    ).toHaveText(count);
}

async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
}
}