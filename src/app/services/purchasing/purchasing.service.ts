import { AuthService } from './../../auth/auth.service';
import { StoredProductInCart } from './../../entities/Products/cart';
import { HttpClient } from '@angular/common/http';
import { StoredProduct } from 'src/app/entities/Products/storedproduct';
import { Injectable } from '@angular/core';
import { ResponseMessage } from 'src/app/entities/ResponseMessage/ResponseMessage';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchasingService {

  private purchasingUri="https://localhost:8081/purchasing"



  constructor(private http:HttpClient,private authService:AuthService) { }


  /*
    Manage Shopping Cart
  */
  public addStoredProductToCart(storedProduct:StoredProduct){
    var format ="/cart/my_cart/addStoredProduct"
    format+="?quantity="+storedProduct.selectedQuantity;
    return this.http.put<ResponseMessage>(this.purchasingUri+format,storedProduct);
  }

  public getStoredProductFromCart(){
    var format ="/cart/my_cart"
    return this.http.get<ResponseMessage>(this.purchasingUri+format);
  }

  public removeStoredProductFromCart(storedProduct:StoredProductInCart){
    var format="/cart/my_cart/removeStoredProductInCart";
    return this.http.delete<ResponseMessage>(this.purchasingUri+format,{body:storedProduct});
  }

  public updateSelectedQuantity(storedProductInCart:StoredProductInCart){
    var format="/cart/my_cart/modifyQuantityStoredProductInCart";
    format+="?quantity="+storedProductInCart.updatedQuantity;
    return this.http.put<ResponseMessage>(this.purchasingUri+format,storedProductInCart);
  }

  /*
    Manage purchase
  */


  public purchase(idShoppingCart:number){
    var format="/purchase/"+idShoppingCart;
    return this.http.post<ResponseMessage>(this.purchasingUri+format,null);
  }

  //TODO
  public getPurchases(){
    var format="/purchases/by_period"
    return this.http.get<ResponseMessage>(this.purchasingUri+format);
  }


  public getPurchasesByPeriod(startDate:Date,endDate:Date){

    //pattern backend = "MM-dd-yyyy"




    var format="/purchases/by_period"

    if(startDate!=null){
      var sDate:string=(startDate.getMonth()+1)+"-"+
      startDate.getDate()+"-"+startDate.getFullYear();
      format+="?startDate="+sDate;
    }

    if(endDate!=null){
      var eDate:string=(endDate.getMonth()+1)+"-"+
      endDate.getDate()+"-"+endDate.getFullYear();
      if(startDate!=null) format+="&endDate="+eDate;
      else format+="?endDate="+eDate
    }
    return this.http.get<ResponseMessage>(this.purchasingUri+format);
  }




}
