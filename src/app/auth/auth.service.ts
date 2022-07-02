import { Injectable } from '@angular/core';
import { OAuthService, NullValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Integrazione keycloack
  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/PuntoInformatica',
    redirectUri: window.location.origin,
    clientId: 'puntoinformatica-angular',
    scope: 'openid',
    responseType: 'code',
    // at_hash is not present in JWT token
    disableAtHashCheck: true,
    showDebugInformation: true
  }

  public login(){
    this.oauthService.initLoginFlow();

  }

  public logoff() {
    this.oauthService.logOut();
  }

  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new  JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public getInformation():string{
    return this.oauthService.getAccessToken();
  }

  public isauthenticated(){
    return this.oauthService.hasValidAccessToken();
  }



}
