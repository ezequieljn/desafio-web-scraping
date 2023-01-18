import * as dotenv from "dotenv";

export class Config {
  private constructor() {}

  static init() {
    dotenv.config();
    return new Config();
  }

  get baseUrl() {
    return process.env.BASE_URL;
  }

  get serverUrl() {
    return process.env.SERVER_URL;
  }
}
