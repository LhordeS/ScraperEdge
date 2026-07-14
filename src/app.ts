import express from "express";
import scraperRouter from "./routes/scraper.routes.js"

const app = express();

app.use(scraperRouter)

export default app;
