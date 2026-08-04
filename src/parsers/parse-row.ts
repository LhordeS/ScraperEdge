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
