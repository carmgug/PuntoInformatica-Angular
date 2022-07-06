import { AdministratorPageComponent } from './pages/administrator-page/administrator-page.component';

import { AccountingService } from './services/accounting/accounting.service';
//app.module.ts importa le varie librerie
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { ProductsListComponent } from './pages/search-products-page/products-list/products-list.component';
import { ProductSingleComponent } from './pages/search-products-page/product-single/product-single.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

//keycloack
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

//elementi grafici di angular material
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ShoppingcartPageComponent } from './pages/purchases-cart-page/shoppingcart-page/shoppingcart-page.component';
import { PurchasesPageComponent } from './pages/purchases-cart-page/purchases-page/purchases-page.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';




//test angular material


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomePageComponent,
    ProductSingleComponent,
    ProductsListComponent,
    ShoppingcartPageComponent,
    PurchasesPageComponent,
    AdministratorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['https://localhost:8081/'],
          sendAccessToken: true
      }
    })
  ],
  providers: [AccountingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
