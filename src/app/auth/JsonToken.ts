

export interface JsonToken {
  name:string;
  preferred_username:string;
  given_name:string;
  family_name:string;
  realm_access:RealmAccess;




}

export interface RealmAccess{
  roles:string[];
}

/*

*/
export interface ResourceAccess{
  puntoinformatica_springboot:ClientName;
}
export interface ClientName{
  roles:string[];
}
