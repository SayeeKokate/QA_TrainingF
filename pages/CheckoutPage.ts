import { Page, expect } from '@playwright/test';

export class CheckoutPage {

constructor(private page: Page) {}

async fillDetails(
    firstName: string,
    lastName: string,
    postalCode: string
) {

    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', postalCode);
}

async continueCheckout() {
    await this.page.locator('#continue').click();
}

async verifyValidationMessage(message: string) {
    await expect(
        this.page.locator('[data-test="error"]')
    ).toContainText(message);
}
}