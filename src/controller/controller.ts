import { GetProducts } from "use-case/get-products.use-case";
import HttpServer from "../adapter/api/http.interface";

export class ProductsController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getProducts: GetProducts.UseCase
  ) {
    httpServer.on("get", "/:type", async (params: any, body: any) =>
      getProducts.execute(params.type)
    );
  }
}
