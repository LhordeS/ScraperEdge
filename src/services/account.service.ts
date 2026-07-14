import { Account } from "../types/account.js";
import { scrapers } from "../scrapers/index.js"

export async function getAccounts(): Promise<Account[]> {
  const results = await Promise.all(
    scrapers.map(scraper => scraper())
  )
  return results.flat()
}
