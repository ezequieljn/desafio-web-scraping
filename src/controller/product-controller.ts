import { GetProducts } from "get-products/get-products";
import HttpServer from "../adapter/api/http.interface";

export class ProductsController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getProducts: GetProducts.Create
  ) {
    httpServer.on("get", "/:type", async (params: any, body: any) =>
      getProducts.execute(params.type)
    );
  }
}
