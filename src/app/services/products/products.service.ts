import { ResponseMessage } from './../../entities/ResponseMessage/ResponseMessage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/entities/Products/product';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {



  private ProductsUri="https://localhost:8081/products";

  constructor(private http:HttpClient) { }

  public getByNameAndTypeAndCategory(name:string,type:string,category:string){
    var format="?";
    if(name!=null && name.length!=0){format+="name="+name}
    if(type!=null && type.length!=0 && type!="Unselected Type"){format+="&type="+type}
    if(category!=null && category.length!=0 && category!="Unselected Category"){format+="&category="+category}
    return this.http.get<ResponseMessage>(this.ProductsUri+'/search/by_name_type_category'+format);
  }

  public getById(id:string){
    return this.http.get<ResponseMessage>(this.ProductsUri+'/search/by_id?id='+id);
  }

  public createProduct(product:Product) {
    return this.http.post<ResponseMessage>(this.ProductsUri,product);


  }

  public banProduct(currProduct: Product) {
    var format="/"+currProduct.id;
    return this.http.delete<ResponseMessage>(this.ProductsUri+format);
  }

  public unBanProduct(currProduct:Product){
    var format="/"+currProduct.id;
    return this.http.put<ResponseMessage>(this.ProductsUri+format,null);
  }



}
