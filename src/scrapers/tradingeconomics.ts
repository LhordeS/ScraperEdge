import { chromium } from "playwright";
import { EconomicEvent } from "../types/economic-event.js";
import { RawCalendarRow } from "../types/raw-calendar-row.js";

export function parseRow(rawRow: RawCalendarRow): EconomicEvent {
  const eventTime = rawRow.time;
  const eventCountry = rawRow.country;
  const eventEvent = rawRow.event;
  const eventActual = rawRow.actual ?? null;
  const eventPrevious = rawRow.previous ?? null;
  const eventForecast = rawRow.forecast ?? null;
  let eventImportance: EconomicEvent["importance"];

  const importanceClass = rawRow.importanceClass;

  if (importanceClass?.includes("calendar-date-1")) {
    eventImportance = "Low";
  } else if (importanceClass?.includes("calendar-date-2")) {
    eventImportance = "Medium";
  } else if (importanceClass?.includes("calendar-date-3")) {
    eventImportance = "High";
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

  return calendarEvent;
}

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

    events.push(await parseRow(rawRow));
  }

  console.log(
    `Fetching Complete. Total ${events.length} economic events retrieved`,
  );

  await browser.close();
  return events;
}
