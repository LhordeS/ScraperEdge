import { scrapeMUFG } from "./mufg.js";
import { scrapeRakuten } from "./rakuten.js";
import { scrapeW3Schools } from "./w3schools.js";
import { Scraper }  from "../types/scraper.js";

const scrapers = [
  {
    name: "MUFG",
    scrape: scrapeMUFG,
  },
  {
    name: "Rakuten",
    scrape: scrapeRakuten,
  },
  {
    name: "W3Schools",
    scrape: scrapeW3Schools,
  },
];

export default scrapers;
