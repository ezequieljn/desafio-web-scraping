import { Config } from "../config/config";
import { Scraping } from "../adapter/scraping/scraping";

export namespace GetProducts {
  export type GetProductsInput = {
    laptops: string;
    computers: string;
    phones: string;
    touch: string;
  };

  export class UseCase {
    constructor(
      private readonly puppeteer: any,
      private readonly config: Config
    ) {}
    async execute(input: keyof GetProductsInput) {
      const scraping = new Scraping(this.puppeteer);
      await scraping.init(this.config.baseUrl);
      const products = await scraping.get(input);
      return products.sort((a, b) => a.price - b.price);
    }
  }
}
