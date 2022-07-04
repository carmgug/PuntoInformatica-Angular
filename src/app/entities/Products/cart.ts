import { StoredProduct } from 'src/app/entities/Products/storedproduct';


export class StoredProductInCart{
  id!:number;
  storedProduct!:StoredProduct;
  quantity!:number;
  updatedQuantity!:number;


  public getStoredProduct():StoredProduct{
    return this.storedProduct;
  }


}


export class Cart{
  id!:number;
  storedProductsInCart!:StoredProductInCart[];

  public getStoredProductsInCart():StoredProductInCart[]{
    return this.storedProductsInCart;
  }

}
