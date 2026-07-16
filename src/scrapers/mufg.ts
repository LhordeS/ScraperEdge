// import { Account } from "../types/account.js";

// export async function scrapeMUFG(): Promise<Account[]> {
//   return [
//     {
//       id: "mufg-001",
//       bank: "MUFG",
//       balance: 125000,
//       currency: "JPY",
//     },
//   ];
// }

import { chromium } from "playwright";

export async function scrapeMUFG() {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage()

  // await page.goto("https://example.com");

  console.log(await page.title());

  await browser.close()

  return[]
}
