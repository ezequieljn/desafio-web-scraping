import { GetProducts } from "./use-case/get-products.use-case";
import { ExpressAdapter } from "./adapter/api/express.adapter";
import { ProductsController } from "./controller/controller";
import puppeteer from "puppeteer";
import { Config } from "./config/config";

const httpServer = new ExpressAdapter();
const productsUseCase = new GetProducts.UseCase(puppeteer, Config.init());
new ProductsController(httpServer, productsUseCase);

httpServer.listen(3030);
