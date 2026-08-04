import { RawBook, Book } from "../types/books.js";
import { chromium, Locator } from "playwright";

export async function scrapeBooks() {
  console.log("Checking for books...");
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto("https://books.toscrape.com/");

  const books = page.locator("article.product_pod > h3 > a");

  const bookCollection: Book[] = [];

  let pageCount = 1;

  while (true) {
    console.log(`Scraping page ${pageCount}`);
    const hrefs: string[] = [];
    const count = await books.count();

    for (let i = 0; i < count; i++) {
      const href = await books.nth(i).getAttribute("href");
      if (href) {
        hrefs.push(new URL(href, page.url()).toString());
      }
    }

    for (const href of hrefs) {
      const detailPage = await browser.newPage();
      await detailPage.goto(href);
      const book = detailPage.locator("article.product_page");

      const tableRows = await book.locator("table > tbody > tr").all();

      const details: Record<string, string> = {};

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
        description: await book
          .locator("#product_description + p")
          .textContent(),
      };
      bookCollection.push(bookDetails);
      await detailPage.close();
    }
    const nextPage = await page
      .locator("ul.pager > li.next > a")
      .getAttribute("href");

    if (!nextPage) {
      break;
    }

    await page.goto(
      new URL(nextPage, "https://books.toscrape.com/").toString(),
    );
    pageCount++;
  }

  await browser.close();
  console.log(`${bookCollection.length} books retrieved`);
  return bookCollection;
}
