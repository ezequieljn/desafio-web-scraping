import { ExpressAdapter } from "./adapter/api/express.adapter";
import { Scraping } from "./adapter/scraping/scraping";
import { Config } from "./config/config";
import { ProductsController } from "./controller/product-controller";
import { GetProducts } from "./get-products/get-products";
import puppeteer from "puppeteer";
import request from "supertest";

describe("E2E test", () => {
  let httpServer: ExpressAdapter;

  function createServer(urlLocal?: string) {
    httpServer = new ExpressAdapter();
    const scraping = new Scraping(puppeteer);
    if (urlLocal) {
      jest.spyOn(scraping as any, "generateUrl").mockReturnValue(urlLocal);
    }
    const productsUseCase = new GetProducts.Create(scraping, Config.init());
    new ProductsController(httpServer, productsUseCase);
  }

  it("should return ordered products when found", async () => {
    const url = `file://${process.cwd()}/src/@share/testing/site-mock.html`;
    createServer(url);
    return request(httpServer.app)
      .get("/laptops")
      .expect([
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
      ])
      .expect(200);
  });

  it("should return empty when it finds nothing", async () => {
    const url = `file://${process.cwd()}/src/@share/testing/site-error.html`;
    createServer(url);
    return request(httpServer.app).get("/laptops").expect([]).expect(200);
  });
});
