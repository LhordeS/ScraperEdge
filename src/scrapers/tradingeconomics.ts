import { chromium } from "playwright";
import { RawCalendarRow } from "../types/raw-calendar-row.js";
import { parseRow } from "../parsers/parse-row.js"

export async function scrapeTradingEconomics() {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://tradingeconomics.com/calendar");

  const rows = await page.locator("#calendar > tbody > tr").all();

  const events = [];

  console.log("Fetching economic calendar events...");

  for (const row of rows) {
    const cells = await row.locator("td").all();

    const rawRow: RawCalendarRow = {
      time: (await cells[0].textContent())?.trim(),
      country: (await cells[1].textContent())?.trim(),
      event: (await cells[4].textContent())?.trim(),
      actual: (await cells[5].textContent())?.trim(),
      previous: (await cells[6].textContent())?.trim(),
      forecast: (await cells[7].textContent())?.trim(),
      importanceClass: await cells[0].locator("span").getAttribute("class"),
    }

    events.push(parseRow(rawRow));
  }

  console.log(
    `Fetching Complete. Total ${events.length} economic events retrieved`,
  );
  console.log(events.slice(0, 5));

  await browser.close();
  return events;
}
