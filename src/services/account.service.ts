import { Account } from "../types/account.js";
import scrapers from "../scrapers/index.js"

export async function getAccounts(scraperRegistry = scrapers): Promise<Account[]> {
  const results = await Promise.allSettled(
    scraperRegistry.map(scraper => scraper.scrape())
  )
  console.log("GET /accounts");
  for (let i = 0; i < results.length; i++) {
    const result = results[i];

    if (result.status === "fulfilled") {
      console.log(`${scraperRegistry[i].name} scraper completed`);
    } else {
      console.error(`${scraperRegistry[i].name} scraper failed:`, result.reason.message);
    }
  }
  const successfulResults = results.filter(result => result.status === "fulfilled")
  const accounts = successfulResults.map(result => result.value)

  return accounts.flat()
}
