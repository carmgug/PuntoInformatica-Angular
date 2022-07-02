import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  private userUri= "https://localhost:8081/users"

  constructor(private http:HttpClient) { }


  public getUser(){
    return this.http.get(this.userUri+'/logged');
  }





}
