import { Router } from "express";
import { getAccounts } from "../services/account.service.js";

export function createScraperRouter(accountsService = getAccounts) {
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

  return router;
}
