import { Account } from "./account.js"

export type Scraper = () => Promise<Account[]>;
