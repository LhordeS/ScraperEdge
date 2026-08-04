import { RawBook, Book } from "../types/books.js";
import { chromium, Locator } from "playwright";

export async function scrapeBooks() {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto("https://books.toscrape.com/");

  const books = page.locator("article.product_pod > h3 > a");
  const count = await books.count();

  const hrefs: string[] = [];

  for (let i = 0; i < count; i++) {
    const href = await books.nth(i).getAttribute("href");
    if (href) {
      hrefs.push(href);
    }
  }

  const bookCollection = [];

  for (const href of hrefs) {
    await page.goto(new URL(href, "https://books.toscrape.com/").toString());
    const book = page.locator("article.product_page");

    const tableRows = await book.locator("table > tbody > tr").all();

    const details = {};

    for (const row of tableRows) {
      const key = await row.locator("th").textContent();
      const value = await row.locator("td").textContent();
      if (key && value) {
        details[key] = value;
      }
    }

    const bookDetails = {
      title: await book.locator("h1").textContent(),
      price: details["Price (excl. tax)"],
      upc: details["UPC"],
      product_type: details["Product Type"],
      availability: details["Availability"],
      rating: await book
        .locator(".product_main p.star-rating")
        .getAttribute("class"),
      description: await book.locator("#product_description + p").textContent(),
    };
    bookCollection.push(bookDetails);
  }

  await browser.close();
  console.log(bookCollection.slice(0, 3));
}

scrapeBooks();
