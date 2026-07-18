import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../src/app.js";

describe("GET /health", () => {
  it("returns a healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "ScraperEdge",
    });
  });
});
