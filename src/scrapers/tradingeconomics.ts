import { chromium } from "playwright";
import { EconomicEvent } from "../types/economic-event.js";

export async function scrapeTradingEconomics() {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://tradingeconomics.com/calendar");

  const rows = await page.locator("#calendar > tbody > tr").all();

  const events = [];

  console.log("Fetching eceonomic calendar events...");

  for (const row of rows) {
    const cells = await row.locator("td").all();

    const eventTime = (await cells[0].textContent())?.trim();
    const eventCountry = (await cells[1].textContent())?.trim();
    const eventEvent = (await cells[4].textContent())?.trim();
    const eventActual = (await cells[5].textContent())?.trim() ?? null;
    const eventPrevious = (await cells[6].textContent())?.trim() ?? null;
    const eventForecast = (await cells[7].textContent())?.trim() ?? null;
    let eventImportance: EconomicEvent["importance"];

    const span = cells[0].locator("span");
    const className = await span.getAttribute("class");

    if (className?.includes("calendar-date-1")) {
      eventImportance = "Low"
    } else if (className?.includes("calendar-date-2")) {
      eventImportance = "Medium"
    } else if (className?.includes("calendar-date-3")) {
      eventImportance = "High"
    }

    const calendarEvent: EconomicEvent = {
      time: eventTime ?? "",
      country: eventCountry ?? "",
      event: eventEvent ?? "",
      importance: eventImportance,
      actual: eventActual,
      previous: eventPrevious,
      forecast: eventForecast,
    };

    events.push(calendarEvent);
  }

  console.log(
    `Fetching Complete. Total ${events.length} economic events retrieved`,
  );

  await browser.close();
  return events;
}
