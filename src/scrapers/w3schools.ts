import { chromium } from "playwright";
import {  Account } from "../types/account.js"

export async function scrapeW3Schools(): Promise<Account[]> {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage()

  await page.goto("https://www.w3schools.com/html/html_tables.asp");

  const rows = await page.locator("#customers tbody tr").all()

  const accounts: Account[] = [];

  for (const row of rows) {
    const cells = await row.locator("td").all()


    if (cells.length < 3) {
      continue;
    }
      const company = await cells[0].textContent();
      const contract = await cells[1].textContent();
      const country = await cells[2].textContent();

    const account: Account = {
      id: company ?? "",
      bank: company ?? "",
      balance: 0,
      currency: 'USD'
    }

    accounts.push(account);

  }

  await browser.close()

  return accounts;
}
