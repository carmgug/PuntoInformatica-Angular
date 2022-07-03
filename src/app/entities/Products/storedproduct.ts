import { Product } from 'src/app/entities/Products/product';
import { Store } from "../Stores/store";

export class StoredProduct{
  id!:number;
  quantity!:number;
  price!:number;
  store!:Store;
  product!:Product;
}
