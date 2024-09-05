import { type IProduct } from "@/types/entities/Product";
import { Repository } from "./Repository";

export class ProductRepository extends Repository<IProduct> {
  resource() {
    return "products";
  }
}
