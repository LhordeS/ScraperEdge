import { Account } from "../types/account.js";
import { scrapeMUFG } from "../scrapers/mufg.js";

export async function getAccounts(): Promise<Account[]> {
  return await scrapeMUFG();
}
