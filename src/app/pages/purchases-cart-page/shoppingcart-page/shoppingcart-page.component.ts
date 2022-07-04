import { Store } from './../../../entities/Stores/store';

import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from './../../../entities/ResponseMessage/ResponseMessage';

import { PurchasingService } from './../../../services/purchasing/purchasing.service';
import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/entities/Products/cart';
import { StoredProductInCart } from 'src/app/entities/Products/cart';
import { StoredProduct } from 'src/app/entities/Products/storedproduct';
import { Product } from 'src/app/entities/Products/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shoppingcart-page',
  templateUrl: './shoppingcart-page.component.html',
  styleUrls: ['./shoppingcart-page.component.css']
})
export class ShoppingcartPageComponent implements OnInit {
  shoppingcart!: Cart ;
  price!:number;


  constructor(private authService:AuthService,
              private purchasingService:PurchasingService) { }


  ngOnInit(): void {
    if(!this.authService.isauthenticated()){
      alert("Non hai l'accesso a questa pagine")
      window.location.assign("http://localhost:4200/")
    }
    else{
      this.purchasingService.getStoredProductFromCart()
        .subscribe(responseMessage=>{
          console.log(responseMessage);
          console.log(responseMessage.object);
          this.shoppingcart=responseMessage.object;
          this.price=this.totalPrice();
        });
    }
  }

  public removeProductFromCart(storedProductInCart:StoredProductInCart){
    this.purchasingService.removeStoredProductFromCart(storedProductInCart).subscribe(
      responseMessage => {
        alert(responseMessage.message);
        this.shoppingcart=responseMessage.object;
        this.price=this.totalPrice();
      }
    )

  }

  //lato backend ogni utente è associato a un carrello
  public purchase(){
    this.purchasingService.purchase(this.shoppingcart.id)
    .subscribe({
      next: (responseMessage) => {
        alert(responseMessage.message);
        this.shoppingcart.storedProductsInCart=[];
        this.price=this.totalPrice();

      },
      error: (e) => {
        var error:HttpErrorResponse= e;
        alert(error.error.message);
      }
    })
  }


  public updateQuantity(storedProductInCart:StoredProductInCart){

    this.purchasingService.updateSelectedQuantity(storedProductInCart)
      .subscribe({
        next: (responseMessage) => {
          alert(responseMessage.message);
          this.shoppingcart=responseMessage.object;
          this.price=this.totalPrice();
        },
        error: (e) => {
          var error:HttpErrorResponse= e;
          alert(error.error.message);
        }
      })

  }

  private totalPrice(){
    var totalPrice:number=0;
    var storedProductsInCart:StoredProductInCart[]=this.shoppingcart.storedProductsInCart;
    for (var i=0; i<storedProductsInCart.length; i++){
      var currStoredProductInCart:StoredProductInCart=storedProductsInCart[i];
      var currPrice:number=currStoredProductInCart.storedProduct.price*currStoredProductInCart.quantity;
      totalPrice+=currPrice;
    }
    return totalPrice;
  }

  public numSequence(n: number): Array<number> {
    return new Array(n);
  }

  public aboutStore(storedProductInCart:StoredProductInCart):string{
    var currStore:Store=storedProductInCart.storedProduct.store;
    var result:string=currStore.country+','+currStore.region+','
    +currStore.city+' ('+currStore.province+') '+','
    +currStore.address+','+currStore.postalCode;
    return result;

  }

}
