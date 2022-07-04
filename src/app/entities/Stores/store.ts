export class Store {
  id!: number;
  country!: string;
  region !: string;
  city !: string;
  province !: string;
  address !: string;
  postalCode !: number;


  public informazioni():string{

    var result:string=this.country+','+this.region+','
          +this.city+' ('+this.province+') '+','
      +this.address+','+this.postalCode;
    return result;
  }


}


