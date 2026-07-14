import { Account } from "../types/account.js";
import { scrapeMUFG } from "../scrapers/mufg.js";
import { scrapeRakuten } from "../scrapers/rakuten.js";

export async function getAccounts(): Promise<Account[]> {
  const [mufgAccounts, rakutenAccounts] = await Promise.all([
    scrapeMUFG(),
    scrapeRakuten(),
  ])
  return [...mufgAccounts, ...rakutenAccounts]
}
