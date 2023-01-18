import { Scraping } from "../adapter/scraping/scraping";
import { Config } from "../config/config";
import puppeteer from "puppeteer";
import { GetProducts } from "./get-products";

describe("Get Products - Test Int", () => {
  it("should bring the ordered products ", async () => {
    const scraping = new Scraping(puppeteer);
    const url = `file://${process.cwd()}/src/@share/testing/site-mock.html`;
    jest.spyOn(scraping as any, "generateUrl").mockReturnValue(url);
    const getProducts = new GetProducts.Create(scraping, Config.init());
    const output = await getProducts.execute("laptops");
    expect(output).toStrictEqual([
      {
        name: "Iconia B1-730HD",
        description: 'Black, 7", 1.6GHz Dual-Core, 8GB, Android 4.4',
        price: 99.99,
        reviews: 1,
        ratings: 3,
      },
      {
        name: "MeMO Pad 7",
        description: 'White, 7", Atom 1.2GHz, 8GB, Android 4.4',
        price: 130.99,
        reviews: 11,
        ratings: 1,
      },
      {
        name: "Asus ROG Strix G...",
        description:
          'Asus ROG Strix GL702VM-GC146T, 17.3" FHD, Core i7-7700HQ, 8GB, 1TB + 128GB SSD, GeForce GTX 1060 3GB, Windows 10 Home, Eng kbd',
        price: 1399,
        reviews: 10,
        ratings: 3,
      },
    ]);
  });

  it("should bring the ordered products ", async () => {
    const scraping = new Scraping(puppeteer);
    const url = `file://${process.cwd()}/src/@share/testing/site-error.html`;
    jest.spyOn(scraping as any, "generateUrl").mockReturnValue(url);
    const getProducts = new GetProducts.Create(scraping, Config.init());
    const output = await getProducts.execute("product-not-found" as any);
    expect(output).toStrictEqual([]);
  });
});
