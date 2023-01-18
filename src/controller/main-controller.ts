import { Config } from "config/config";
import HttpServer from "../adapter/api/http.interface";

export class MainController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly config: Config
  ) {
    httpServer.on("get", "/", async (params: any, body: any) => {
      const routes = ["laptops", "computers", "phones", "touch"];
      const routesFull = routes.map((route) => `${config.serverUrl}${route}`);
      return routesFull;
    });
  }
}
