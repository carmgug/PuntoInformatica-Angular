import { Store } from './../../entities/Stores/store';
import { ResponseMessage } from './../../entities/ResponseMessage/ResponseMessage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class StoreService {


  private StoresUri="https://localhost:8081/stores"

  constructor(private http:HttpClient) { }

  public createStore(store:Store){
    return this.http.post<ResponseMessage>(this.StoresUri,store);
  }

  public banStore(store:Store){
    var format="/"+store.id;
    return this.http.delete<ResponseMessage>(this.StoresUri+format);
  }
  public unBanStore(store:Store){
    var format="/"+store.id;
    return this.http.put<ResponseMessage>(this.StoresUri+format,null);
  }

  public getByCountryAndRegionAndCityAndAddress(info:Store){
    var format="/search/by_varparams?";
    format+="country="+info.country+"&region="+info.region;
    if(info.city!=null) format+="&city="+info.city;
    if(info.province!=null) format+="&province="+info.province;
    if(info.address!=null) format+="&address="+info.address;
    if(info.postalCode!=null) format+="&postalCode="+info.postalCode;

    return this.http.get<ResponseMessage>(this.StoresUri+format);
  }




  public getStoredProductsByProduct(productID:String){
    var format ="/storedProducts/search/getByvarParams?product_id="+productID+"&onlyAvailable=true";
    return this.http.get<ResponseMessage>(this.StoresUri+format);
  }

  createStoredProduct(idStore: number, idProduct: number, quantityStoredProduct: number, priceStoredProduct: number) {
    var format="/"+idStore+"/"+idProduct+"?quantity="+quantityStoredProduct+"&price="+priceStoredProduct;
    return this.http.post<ResponseMessage>(this.StoresUri+format,null);
  }

  deleteStoredProduct(idStore: number, idProduct: number) {
    var format="/"+idStore+"/"+idProduct;
    return this.http.delete<ResponseMessage>(this.StoresUri+format);
  }
  updateStoredProduct(idStore: number, idProduct: number, quantityStoredProduct: number, priceStoredProduct: number) {
    var format="/"+idStore+"/"+idProduct;
    if(quantityStoredProduct!=null){
      format+="?quantity="+quantityStoredProduct;
    }
    if(priceStoredProduct!=null){
      if(quantityStoredProduct==null) format+="?price="+priceStoredProduct;
      else format+="&price="+priceStoredProduct;
    }
    return this.http.put<ResponseMessage>(this.StoresUri+format,null);
  }




}
