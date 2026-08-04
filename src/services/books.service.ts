import { Book } from "../types/books.js"
import { scrapeBooks } from "../scrapers/books-to-scrape.js"

export function getBooks(): Promise<Book[]> {
  return scrapeBooks()
}
