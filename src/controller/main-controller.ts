import HttpServer from "../adapter/api/http.interface";

export class MainController {
  constructor(readonly httpServer: HttpServer) {
    httpServer.on("get", "/", async (params: any, body: any) => {
      return ["laptops", "computers", "phones", "touch"];
    });
  }
}
