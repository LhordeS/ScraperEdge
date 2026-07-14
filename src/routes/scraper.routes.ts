import { Router } from "express";
import { getAccounts } from "../services/account.service.js";

const router = Router();

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
