import { ProductsService } from './../../services/products/products.service';

import { HttpErrorResponse } from '@angular/common/http';
import { StoreService } from './../../services/store/Store.service';

import { Store } from './../../entities/Stores/store';
import { Product } from './../../entities/Products/product';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator-page',
  templateUrl: './administrator-page.component.html',
  styleUrls: ['./administrator-page.component.css']
})
export class AdministratorPageComponent implements OnInit {

  //Store
  store:Store=new Store();
  storeToCreate:Store=new Store();
  searchedStore:Store[]=[];

  //StoredProducts
  idStore!:number;
  idProduct!:number;
  quantityStoredProduct!:number;
  priceStoredProduct!:number;

  productStoredProduct:Product=new Product();

  //Prodotti
  product:Product=new Product();
  productToCreate:Product=new Product();
  searchedProduct:Product[]=[];
  availableCategories= ["Unselected Category",
    "ACCESSORIESandPERIPHERALS","COMPONENT","COMPUTER",
    "MAC","MONITORS","SMARTPHONE",
    "VIDEOGAMES","SYSTEMSOFTWARE","APPLICATIONSOFTWARE"];
  availableTypes= ["Unselected Type","HARDWARE","SOFTWARE"];



  constructor(private authService:AuthService,
              private storeService:StoreService,
              private productService:ProductsService) { }

  ngOnInit(): void {
    if(!this.authService.isauthenticated() || !this.authService.isAdmin()){
      alert("Non hai l'accesso a questa pagine");
      window.location.assign("http://localhost:4200");
    }
  }

  /*
    Metodi gestione Store
  */

  public searchStores(){

    this.storeService.getByCountryAndRegionAndCityAndAddress(this.store)
    .subscribe({
        next: (responseMessage) =>{
          alert(responseMessage.message);
          this.searchedStore=responseMessage.object;
          console.log(this.searchedStore);
        },
        error: (e) =>{
          var errorHttp:HttpErrorResponse=e;
          alert(errorHttp.error.message);
        }
    });
  }

  public banStore(currStore:Store){
    this.storeService.banStore(currStore)
      .subscribe({
        next: (responseMessage) =>{
          alert(responseMessage.message);
          currStore.banned=true;
        },
        error: (e) =>{
          var errorHttp:HttpErrorResponse=e;
          alert(errorHttp.error.message);
        }
    });
  }

  public unBanStore(currStore:Store){
    this.storeService.unBanStore(currStore)
      .subscribe({
        next: (responseMessage) =>{
          alert(responseMessage.message);
          currStore.banned=false;
        },
        error: (e) =>{
          var errorHttp:HttpErrorResponse=e;
          alert(errorHttp.error.message);
        }
    });
  }



  public createStore(currStore:Store){
    this.storeService.createStore(currStore)
      .subscribe({
        next: (responseMessage) =>{
          alert(responseMessage.message);
        },
        error: (e) =>{
          var errorHttp:HttpErrorResponse=e;
          alert(errorHttp.error.message);
        }
    });

  }

  public searchProduct(){
    this.productService.getByNameAndTypeAndCategory(this.product.name,this.product.type,this.product.category)
      .subscribe({
        next: (responseMessage) =>{
          alert(responseMessage.message);
          this.searchedProduct=responseMessage.object;
        },
        error: (e) =>{
          var errorHttp:HttpErrorResponse=e;
          alert(errorHttp.error.message);
        }
    })
  }
  public createProduct(){
    this.productService.createProduct(this.productToCreate)
      .subscribe({
        next: (responseMessage) =>{
          alert(responseMessage.message);
        },
        error: (e) =>{
          var errorHttp:HttpErrorResponse=e;
          alert(errorHttp.error.message);
        }
    })

  }
  public banProduct(currProduct:Product){
    this.productService.banProduct(currProduct)
    .subscribe({
      next: (responseMessage) =>{
        alert(responseMessage.message);
        currProduct.banned=true;
      },
      error: (e) =>{
        var errorHttp:HttpErrorResponse=e;
        alert(errorHttp.error.message);
      }
  });
  }

  public unBanProduct(currProduct:Product){
    this.productService.unBanProduct(currProduct)
      .subscribe({
        next: (responseMessage) =>{
          alert(responseMessage.message);
          currProduct.banned=false;
        },
        error: (e) =>{
          var errorHttp:HttpErrorResponse=e;
          alert(errorHttp.error.message);
        }
    });
  }











}
