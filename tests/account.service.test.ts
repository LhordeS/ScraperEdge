import { beforeEach, afterAll, describe, expect, it, vi } from "vitest";
import { getAccounts } from "../src/services/account.service.js";

const consoleErrorSpy = vi.spyOn(console, "error");

beforeEach(() => {
  consoleErrorSpy.mockClear();
  consoleErrorSpy.mockImplementation(() => {});
});

afterAll(() => {
  consoleErrorSpy.mockRestore();
});

describe("getAccounts", () => {
  it("returns accounts from successful scrapers", async () => {
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

  it("returns accounts even if on scraper fails", async () => {
    const fakeScrapers = [
      {
        name: "Working Bank",
        scrape: async () => [
          {
            id: "1",
            bank: "Working Bank",
            balance: 1000,
            currency: "JPY",
          },
        ],
      },
      {
        name: "Broken Bank",
        scrape: async () => {
          throw new Error("Connection failed");
        },
      },
    ];

    const accounts = await getAccounts(fakeScrapers);

    expect(accounts).toEqual([
      {
        id: "1",
        bank: "Working Bank",
        balance: 1000,
        currency: "JPY",
      },
    ]);
  });

  it("returns an empty array if all scrapers fail", async () => {
    const fakeScrapers = [
      {
        name: "Failed Bank",
        scrape: async () => {
          throw new Error("Connection failed");
        },
      },
    ];
    const accounts = await getAccounts(fakeScrapers);

    expect(accounts).toEqual([]);
  });

  it("flattens accounts returned by multiple successful scrapers", async () => {
    const fakeScrapers = [
      {
        name: "Array of Banks",
        scrape: async () => [
          {
            id: "1",
            bank: "Array Bank 1",
            balance: 1000,
            currency: "JPY",
          },
        ],
      },
      {
        name: "Banks Array",
        scrape: async () => [
          {
            id: "2",
            bank: "Array Bank 2",
            balance: 50000,
            currency: "JPY",
          },
        ],
      },
    ];
    const accounts = await getAccounts(fakeScrapers);

    expect(accounts).toEqual([
      {
        id: "1",
        bank: "Array Bank 1",
        balance: 1000,
        currency: "JPY",
      },
      {
        id: "2",
        bank: "Array Bank 2",
        balance: 50000,
        currency: "JPY",
      },
    ]);
  });
});
