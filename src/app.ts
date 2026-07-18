import express from "express";
import { createScraperRouter } from "./routes/scraper.routes.js"

const app = express();

app.use(createScraperRouter())

export default app;
