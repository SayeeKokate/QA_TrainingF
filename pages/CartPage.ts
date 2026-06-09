import { Page, expect } from '@playwright/test';

export class CartPage {

constructor(private page: Page) {}

async verifyProduct(product: string) {
    await expect(
        this.page.getByText(product)
    ).toBeVisible();
}

async checkout() {
    await this.page.locator('#checkout').click();
}
}