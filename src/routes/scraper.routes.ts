import { Router } from "express";
import { getAccounts } from "../services/account.service.js";

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
  const accounts = await getAccounts();

  response.json(accounts);
});

export default router;
