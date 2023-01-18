import { Scraping } from "./scraping";
import puppeteer from "puppeteer";
import { Config } from "../../config/config";

describe("Scraping Test", () => {
  let scraping: Scraping;
  const baseUrl = `https://myapp.com.br`;
  beforeEach(async () => {
    scraping = new Scraping(puppeteer);
    await scraping.init(baseUrl);
  });

  afterEach(async () => {
    await scraping.close();
  });

  it("should return an array with the laptops and their data", async () => {
    const url = `file://${process.cwd()}/src/@share/testing/site-mock.html`;
    jest.spyOn(scraping as any, "generateUrl").mockReturnValue(url);
    const products = await scraping.get("laptops");
    expect(products).toStrictEqual([
      {
        description: 'Black, 7", 1.6GHz Dual-Core, 8GB, Android 4.4',
        name: "Iconia B1-730HD",
        price: 99.99,
        ratings: 3,
        reviews: 1,
      },
      {
        description:
          'Asus ROG Strix GL702VM-GC146T, 17.3" FHD, Core i7-7700HQ, 8GB, 1TB + 128GB SSD, GeForce GTX 1060 3GB, Windows 10 Home, Eng kbd',
        name: "Asus ROG Strix G...",
        price: 1399,
        ratings: 3,
        reviews: 10,
      },
      {
        description: 'White, 7", Atom 1.2GHz, 8GB, Android 4.4',
        name: "MeMO Pad 7",
        price: 130.99,
        ratings: 1,
        reviews: 11,
      },
    ]);
  });

  describe("should be able to clean transform the data to already formatted number", () => {
    const arrange = [
      { value: 100, expected: 100 },
      { value: "value", expected: 0 },
      { value: "R$95.5", expected: 95.5 },
      { value: "compu.ters", expected: NaN },
      { value: "ph9o0nes", expected: 90 },
    ];

    test.each(arrange)("values: %j", ({ expected, value }) => {
      const transformNumber = scraping["clearNumber"](value as any);
      expect(transformNumber).toBe(expected);
    });
  });

  describe("should be able to generate the url based on the data type", () => {
    const arrange = [
      { value: "aaaa", expected: "/aaaa" },
      { value: "value", expected: "/value" },
      { value: "laptops", expected: "/computers/laptops" },
      { value: "computers", expected: "/computers" },
      { value: "phones", expected: "/phones" },
      { value: "touch", expected: "/phones/touch" },
    ];

    test.each(arrange)("values: %j", ({ expected, value }) => {
      const transformUrl = scraping["generateUrl"](value as any);
      expect(transformUrl).toBe(`${baseUrl}${expected}`);
    });
  });
});
