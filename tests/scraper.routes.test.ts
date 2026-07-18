import express from "express";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { createScraperRouter } from "../src/routes/scraper.routes.js";

describe("GET /accounts", () => {
  it("returns the account from the service", async () => {
    const fakeGetAccounts = vi.fn().mockResolvedValue([
      {
        id: "1",
        bank: "Test Bank",
        balance: 2000,
        currency: "JPY",
      },
    ]);

    const app = express();
    app.use(createScraperRouter(fakeGetAccounts));

    const response = await request(app).get("/accounts");

    expect(response.body).toEqual([
      {
        id: "1",
        bank: "Test Bank",
        balance: 2000,
        currency: "JPY",
      },
    ]);
    expect(fakeGetAccounts).toHaveBeenCalledTimes(1)
  });

  it("returns 500 if the service throws", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });
    const fakeGetAccounts = vi.fn().mockRejectedValue(new Error("Something went wrong"));

    const app = express();
    app.use(createScraperRouter(fakeGetAccounts));

    const response = await request(app).get("/accounts");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to retrieve accounts",
    });
    expect(fakeGetAccounts).toHaveBeenCalledTimes(1);

    consoleErrorSpy.mockRestore()
  })
});
