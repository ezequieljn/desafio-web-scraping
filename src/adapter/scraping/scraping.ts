import { Browser, ElementHandle, Page } from "puppeteer";
import { ProductsProps } from "./products.interface";
import { routes, ScrapingInterface } from "./scraping.interface";

export class Scraping implements ScrapingInterface {
  private browser: Browser;
  private webPage: Page;
  private baseUrl: string;

  private routes = {
    laptops: "/computers/laptops",
    computers: "/computers",
    phones: "/phones",
    touch: "phones/touch",
  };

  constructor(private puppeteer: any) {}

  async init(baseUrl: string): Promise<void> {
    this.browser = await this.puppeteer.launch();
    this.webPage = await this.browser.newPage();
    this.baseUrl = baseUrl;
  }

  async get(route: keyof routes) {
    const url = `${this.baseUrl}${this.routes[route]}`;
    await this.webPage.goto(url);
    const divs = await this.webPage.$$(".row .thumbnail");

    const products: ProductsProps[] = [];
    for (const div of divs) {
      const name = await this.getValueClass(div, ".title");
      const description = await this.getValueClass(div, ".description");
      const price = await this.getValueClass(div, ".price");
      const reviews = await this.getValueClass(div, ".ratings .pull-right");
      const rating = await div.$$eval("span", (e) => e);

      products.push({
        name,
        description,
        price: this.clearNumber(price),
        reviews: this.clearNumber(reviews),
        ratings: rating.length,
      });
    }
    return products;
  }

  clearNumber(value: string) {
    const regexOnlyNumber = /[^0-9.]/g;
    return +value!.replace(regexOnlyNumber, "");
  }

  async getValueClass(div: ElementHandle<Element>, className: string) {
    return div.$eval(className, (e) => e.textContent);
  }

  async close() {
    await this.browser.close();
  }
}
