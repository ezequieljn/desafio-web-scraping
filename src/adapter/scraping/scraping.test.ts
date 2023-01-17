import { Scraping } from "./scraping";
import { ScrapingInterface } from "./scraping.interface";
import puppeteer from "puppeteer";
import { Config } from "../../config/config";

describe("Scraping Test", () => {
  const config = Config.init();
  let scraping: ScrapingInterface;

  beforeEach(async () => {
    scraping = new Scraping(puppeteer);
    await scraping.init(config.baseUrl);
  });

  afterEach(async () => {
    await scraping.close();
  });

  it("should return length computers products", async () => {
    const products = await scraping.get("computers");
    expect(products).toHaveLength(3);
  });

  it("should return length computers laptops", async () => {
    const products = await scraping.get("laptops");
    expect(products).toHaveLength(117);
  });
});
