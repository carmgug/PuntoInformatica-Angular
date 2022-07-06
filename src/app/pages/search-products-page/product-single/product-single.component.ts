import { PurchasingService } from './../../../services/purchasing/purchasing.service';
import { AuthService } from './../../../auth/auth.service';
import { StoreService } from './../../../services/store/Store.service';
import { ProductsService } from './../../../services/products/products.service';
import { Product } from 'src/app/entities/Products/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoredProduct } from 'src/app/entities/Products/storedproduct';


import {HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {
  product!:Product
  storedProducts!: StoredProduct[] ;

  constructor(private productService:ProductsService,
              private storeService:StoreService,
              private route: ActivatedRoute,
              private purchasingService:PurchasingService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if(!this.authService.isauthenticated()){
      alert("Non hai l'accesso a questa pagine")
      window.location.assign("http://localhost:4200/")
    }

    this.route.params.subscribe(params =>{
      const idProduct = params['product'];

      this.productService.getById(idProduct)
      .subscribe(
        responseMessage=>{
        console.log(responseMessage);
        this.product=responseMessage.object;
        },
        error=>{
          var e:HttpErrorResponse=error;
          alert(e.error.message);
          window.location.assign("http://localhost:4200");
        }
      );

      this.storeService.getStoredProductsByProduct(idProduct)
      .subscribe(responseMessage=>{
        console.log(responseMessage);
        this.storedProducts=responseMessage.object;
      });

    });
  }


  public numSequence(n: number): Array<number> {
    return new Array(n);
  }

  public action(storedProduct:StoredProduct){
    this.purchasingService.addStoredProductToCart(storedProduct)
      .subscribe({
        next: (responseMessage) => alert(responseMessage.message),

        error: (error) => {
          var e:HttpErrorResponse=error;
          console.log(e);
          alert(e.error.message);
        }
    });

  }

}
