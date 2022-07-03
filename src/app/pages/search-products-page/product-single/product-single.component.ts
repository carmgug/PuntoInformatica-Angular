import { StoreService } from './../../../services/store/Store.service';
import { ProductsService } from './../../../services/products/products.service';
import { Product } from 'src/app/entities/Products/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoredProduct } from 'src/app/entities/Products/storedproduct';

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
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      const idProduct = params['product'];

      this.productService.getById(idProduct)
      .subscribe(responseMessage=>{
        console.log(responseMessage);
        this.product=responseMessage.object;
      });

      this.storeService.getStoredProductsByProduct(idProduct)
      .subscribe(responseMessage=>{
        console.log(responseMessage);
        this.storedProducts=responseMessage.object;
      });
    });
  }

}
