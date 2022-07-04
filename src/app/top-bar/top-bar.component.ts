import { HttpErrorResponse } from '@angular/common/http';
import { AccountingService } from './../services/accounting/accounting.service';




import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  //TODO il taso di invio al db, deve diventare verde

  title = 'PuntoInformatica';
  user : any;
  logged: boolean= false;


  constructor(private authService : AuthService,private accountingService:AccountingService ) {
   }

  ngOnInit(): void  {


  }

   public sendUserToDB(){

    this.accountingService.getUser()
    .subscribe(data => {
      console.log(data);
      this.user=data;
    },
    (error) => {                              //Error callback
       var e:HttpErrorResponse= error;
       alert("Il login non è andato a buon fine, Prova ad effetuare il logout e il login o contatta l'amministratore.");
    });

    console.log(this.authService.getInformation()); //debug
  }


  private async login() {
    this.authService.login();

  }

  private logout(){
    this.authService.logoff();
  }

  public isAuthenticated(): boolean{
    return this.authService.isauthenticated();
  }


  public works(){
    alert("il taso funziona!");
  }
  public authentication(){
    if(!this.isAuthenticated()){ this.login(); }
    else {this.logout();}
  }

  public typeofaccess():string[]{
    if(!this.isAuthenticated()) return ["login","Login"];
    else return ["logout","Logout"];
  }








}
