import { JsonToken } from './JsonToken';
import { Injectable } from '@angular/core';
import { OAuthService, NullValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import jwtDecode from 'jwt-decode';
import { User } from './user';

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
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public getInformation():string{
    return this.oauthService.getAccessToken();
  }

  public isauthenticated(){
    return this.oauthService.hasValidAccessToken();
  }

  public getEmail(){
    const currUser:User= <User> this.oauthService.getIdentityClaims();
    return currUser.preferred_username;

  }

  public getInfoAboutUser():JsonToken{
    const token=this.oauthService.getAccessToken();
    const decodedToken=<JsonToken>jwtDecode(token);
    return decodedToken;
  }

  public isAdmin(){
    const token=this.oauthService.getAccessToken();
    const decodedToken=<JsonToken>jwtDecode(token);
    return decodedToken.realm_access.roles.includes('app-admin');

  }



}
