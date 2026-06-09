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
 

async continueShopping(){
    await this.page.locator('#continue-shopping')
    .click();
}

async removeProduct(){
    await this.page.locator('#remove-sauce-labs-backpack')
    .click();
}
}
