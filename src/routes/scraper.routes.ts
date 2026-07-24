import { Router } from "express";
import { getAccounts } from "../services/account.service.js";
import { getCalendarEvents } from "../services/calendar.services.js";

export function createScraperRouter(
  accountsService = getAccounts,
  eventsService = getCalendarEvents,
) {
  const router = Router();

  // Check if frontend and backend are connecting
  // (Other similar APIs can be written to chack other aspects of the app/server)
  // Will also be used to check the health of servers such as AWS and Load Balancer
  router.get("/health", (request, response) => {
    response.json({
      status: "ok",
      service: "ScraperEdge",
    });
  });

  router.get("/accounts", async (request, response) => {
    try {
      const accounts = await accountsService();
      response.json(accounts);
    } catch (error) {
      console.error(error);

      response.status(500).json({
        error: "Failed to retrieve accounts",
      });
    }
  });

  router.get("/calendar", async (request, response) => {
    try {
      const events = await eventsService();
      response.json(events);
    } catch (error) {
      console.error(error);

      response.status(500).json({
        error: "Failed to retrieve events",
      });
    }
  });

  return router;
}
