import { StoredProduct } from 'src/app/entities/Products/storedproduct';





export class Purchase {
  id!:number;
  purchaseTime!:number;
  price!:number;
  productsInPurchase!:StoredProductInPurchase[];
}

export class StoredProductInPurchase{
  id!:number;
  quantity!:number;
  price!:number;
  storedProduct!:StoredProduct;
}
