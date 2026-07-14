import { Account } from "../types/account.js";

export async function scrapeMUFG(): Promise<Account[]> {
  return [
    {
      id: "mufg-001",
      bank: "MUFG",
      balance: 125000,
      currency: "JPY",
    },
  ];
}
