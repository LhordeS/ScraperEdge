import { scrapeMUFG } from "./mufg.js";
import { scrapeRakuten } from "./rakuten.js";
import { Scraper } from "../types/scraper.js";

const scrapers: Scraper[] = [scrapeMUFG, scrapeRakuten];

export default scrapers
