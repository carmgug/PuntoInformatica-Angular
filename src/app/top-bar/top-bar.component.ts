import { HttpClient } from '@angular/common/http';
import { AccountingService } from './../services/accounting/accounting.service';

import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  title = 'PuntoInformatica';
  data='';


  constructor(private authService : AuthService,private http:HttpClient ) {
   }

  ngOnInit(): void {


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


  public sendUserToDB(){
    this.http.get('http://localhost:8081/users/logged')
    .subscribe(data => {
      console.log(data);
    })
    console.log(this.authService.getInformation());

  }

  public works(){
    alert("Il tasto funziona");
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
