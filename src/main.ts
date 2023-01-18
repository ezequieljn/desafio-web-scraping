import { GetProducts } from "./get-products/get-products";
import { ExpressAdapter } from "./adapter/api/express.adapter";
import { ProductsController } from "./controller/product-controller";
import { MainController } from "./controller/main-controller";
import puppeteer from "puppeteer";
import { Config } from "./config/config";
import { Scraping } from "./adapter/scraping/scraping";

const httpServer = new ExpressAdapter();
const scraping = new Scraping(puppeteer);
const productsUseCase = new GetProducts.Create(scraping, Config.init());
new ProductsController(httpServer, productsUseCase);
new MainController(httpServer, Config.init());

httpServer.listen(3030);
