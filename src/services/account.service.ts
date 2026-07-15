import { Account } from "../types/account.js";
import scrapers from "../scrapers/index.js"

export async function getAccounts(): Promise<Account[]> {
  console.log("getAccounts called");
  const results = await Promise.allSettled(
    scrapers.map(scraper => scraper())
  )
  console.log(results);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error(result.reason);
    }
  }
  const successfulResults = results.filter(result => result.status === "fulfilled")
  const accounts = successfulResults.map(result => result.value)

  return accounts.flat()
}
