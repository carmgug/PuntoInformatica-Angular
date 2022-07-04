import { Product } from 'src/app/entities/Products/product';
import { Store } from "../Stores/store";

export class StoredProduct{
  id!:number;
  quantity!:number;
  selectedQuantity:number=1;
  price!:number;
  store!:Store;
  product!:Product;

  public getStore():Store{
    return this.store;
  }

}
