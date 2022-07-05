import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../../auth/auth.service';
import { PurchasingService } from './../../../services/purchasing/purchasing.service';
import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/entities/Products/Purchase';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-purchases-page',
  templateUrl: './purchases-page.component.html',
  styleUrls: ['./purchases-page.component.css']
})
export class PurchasesPageComponent implements OnInit {

  purchases!:Purchase[];
  startDate!:Date;
  endDate!:Date;




  constructor(private purchasingService:PurchasingService, private authService:AuthService) { }


  ngOnInit(): void {
    if(!this.authService.isauthenticated()){
      alert("Non hai l'accesso a questa pagine")
      window.location.assign("http://localhost:4200/")
    }
    else{
      this.purchasingService.getPurchases()
        .subscribe({
          next: (responseMessage) => {
            console.log(responseMessage);
            this.purchases=responseMessage.object;
          },
          error: (error)=> {
            console.log(error);
            var httpErrorResponse:HttpErrorResponse=error;
            alert(httpErrorResponse.error);
          }
      });


    }
  }

  public getAllPurchases(){
    this.purchasingService.getPurchases()
        .subscribe({
          next: (responseMessage) => {
            alert(responseMessage.message);
            this.purchases=responseMessage.object;
          },
          error: (error)=> {
            console.log(error);
            var httpErrorResponse:HttpErrorResponse=error;
            alert(httpErrorResponse.error);
          }
      });

  }

  public getPurchasesByPeriod(){



    this.purchasingService.getPurchasesByPeriod(this.startDate,this.endDate)
    .subscribe({
      next: (responseMessage) => {
        alert(responseMessage.message);
        this.purchases=responseMessage.object;
      },
      error: (error)=> {
        console.log(error);
        var httpErrorResponse:HttpErrorResponse=error;
        alert(httpErrorResponse.error);
      }
  });


  }



}
