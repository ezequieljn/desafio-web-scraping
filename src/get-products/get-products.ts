import { Config } from "../config/config";
import { Scraping } from "../adapter/scraping/scraping";
import { ProductsProps } from "../adapter/scraping/products.interface";
import { ScrapingInterface } from "adapter/scraping/scraping.interface";

export namespace GetProducts {
  export type Input = {
    laptops: string;
    computers: string;
    phones: string;
    touch: string;
  };

  export type Output = ProductsProps[];

  export class Create {
    constructor(
      private readonly scraping: ScrapingInterface,
      private readonly config: Config
    ) {}
    async execute(input: keyof Input): Promise<Output> {
      await this.scraping.init(this.config.baseUrl);
      const products = await this.scraping.get(input);
      return products.sort((a, b) => a.price - b.price);
    }
  }
}
