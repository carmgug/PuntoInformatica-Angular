import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';


//app.component.ts definisce le variabili

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PuntoInformatica';
  footer = 'Il sito PuntoInformatica è stato sviluppato da Carmelo Gugliotta mat:213477'
  constructor() { }






}
