import { ResponseMessage } from './../../../entities/ResponseMessage/ResponseMessage';
import { ProductsService } from './../../../services/products/products.service';
import { Product } from '../../../entities/Products/product';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  availableCategories= ["Unselected Category",
    "ACCESSORIESandPERIPHERALS","COMPONENT","COMPUTER",
    "MAC","MONITORS","SMARTPHONE",
    "VIDEOGAMES","SYSTEMSOFTWARE","APPLICATIONSOFTWARE"];
  availableTypes= ["Unselected Type","HARDWARE","SOFTWARE"];
  product: Product= new Product();

  searchedProducts: Product[]=[];



  constructor(private productsService:ProductsService) {
    this.product.type=this.availableTypes[0];
    this.product.category=this.availableCategories[0];
  }

  ngOnInit(): void {
  }


  public search(){


    this.searchedProducts=[];

    this.productsService.getByNameAndTypeAndCategory(this.product.name,this.product.type,this.product.category)
    .subscribe(responseMessage=>{
      this.searchedProducts=responseMessage.object;
      if(this.searchedProducts.length==0) alert(responseMessage.message);
    });


  }

}
