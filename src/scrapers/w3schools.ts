import { chromium } from "playwright";
import {  Account } from "../types/account.js"

export async function scrapeW3Schools(): Promise<Account[]> {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage()

  await page.goto("https://www.w3schools.com/html/html_tables.asp");

  const company = await page
    .locator("#customers tbody tr")
    .nth(1)
    .locator("td")
    .nth(2)
    .textContent();

  await browser.close()

  return [
    {
      id: crypto.randomUUID(),
      bank: "W3Schools",
      balance: 1000,
      currency: company ?? "Unknown",
    }
  ]
}
