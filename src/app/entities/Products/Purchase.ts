import { Product } from './product';
import { Store } from 'src/app/entities/Stores/store';






export class Purchase {
  id!:number;
  purchaseTime!:number;
  price!:number;
  productsInPurchase!:ProductInPurchase[];
}

export class ProductInPurchase{
  id!:number;
  quantity!:number;
  price!:number;
  store!:Store;
  product!:Product;

}
