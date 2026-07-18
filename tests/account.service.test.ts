import { describe, expect, it } from "vitest";
import { getAccounts } from "../src/services/account.service.js";

describe("getAccounts", () => {
  it("returns acoounts from successful scrapers", async () => {
    const fakeScrapers = [
      {
        name: "Test Bank",
        scrape: async () => [
          {
            id: "1",
            bank: "Test Bank",
            balance: 1000,
            currency: "JPY",
          },
        ],
      },
    ];

    const accounts = await getAccounts(fakeScrapers);

    expect(accounts).toEqual([
      {
        id: "1",
        bank: "Test Bank",
        balance: 1000,
        currency: "JPY",
      },
    ]);
  });
});
