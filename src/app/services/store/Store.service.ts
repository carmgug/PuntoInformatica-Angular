import { ResponseMessage } from './../../entities/ResponseMessage/ResponseMessage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class StoreService {

  private StoresUri="https://localhost:8081/stores"

  constructor(private http:HttpClient) { }


  public getStoredProductsByProduct(productID:String){
    var format ="/storedProducts/search/getByvarParams?product_id="+productID+"&onlyAvailable=true";
    return this.http.get<ResponseMessage>(this.StoresUri+format);
  }

}
