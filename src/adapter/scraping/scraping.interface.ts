import { ProductsProps } from "./products.interface";

export type routes = {
  laptops: string;
  computers: string;
  phones: string;
  touch: string;
};

export type ScrapingInterface = {
  init: (base_url: string) => Promise<void>;
  get: (route: keyof routes) => Promise<ProductsProps[]>;
  close: () => Promise<void>;
};
