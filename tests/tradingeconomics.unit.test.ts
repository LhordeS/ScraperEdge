import { describe, expect, it } from "vitest";
import { parseRow } from "../src/scrapers/tradingeconomics.js";
import { RawCalendarRow } from "../src/types/raw-calendar-row.js";

describe("parseRow", () => {
  it("returns the proper object shape representative of an economic event", async () => {
    const rawRow: RawCalendarRow = {
    time: "08:30",
    country: "United States",
    event: "Nonfarm Payrolls",
    actual: "120K",
    previous: "110K",
    forecast: "115K",
    importanceClass: "calendar-date-2",
  };

    const event = parseRow(rawRow);

    expect(event).toEqual(
      {
        time: "08:30",
        country: "United States",
        event: "Nonfarm Payrolls",
        actual: "120K",
        previous: "110K",
        forecast: "115K",
        importance: "Medium",
      },
    );
  });
});
