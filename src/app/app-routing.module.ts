import { AdministratorPageComponent } from './pages/administrator-page/administrator-page.component';

import { PurchasesPageComponent } from './pages/purchases-cart-page/purchases-page/purchases-page.component';
import { ShoppingcartPageComponent } from './pages/purchases-cart-page/shoppingcart-page/shoppingcart-page.component';
import { ProductSingleComponent } from './pages/search-products-page/product-single/product-single.component';
import { ProductsListComponent } from './pages/search-products-page/products-list/products-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'searchProducts',
    component: ProductsListComponent
  },
  {
    path: 'searchProducts/:product',
    component: ProductSingleComponent
  },
  {
    path: 'myCart',
    component: ShoppingcartPageComponent
  },
  {
    path: 'myPurchases',
    component: PurchasesPageComponent
  },
  {
    path: 'administratorPage',
    component: AdministratorPageComponent
  }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
