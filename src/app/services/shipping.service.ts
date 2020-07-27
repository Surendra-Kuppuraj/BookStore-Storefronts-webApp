import { Injectable } from '@angular/core';
import { AppConst } from '../constants/AppConstant';
import { Http, Headers } from '@angular/http';
import { UserShipping } from '../models/user-shipping';
import { Address } from '../models/address';



@Injectable()
export class ShippingService {

  private serverPath: string = AppConst.serverPath+"/shipping";

  constructor(private http : Http) { }

  newShipping(shipping: UserShipping){
    console.log(shipping);
  	return this.http.post(this.serverPath, JSON.stringify(shipping), {headers: AppConst.createHeaderToken()});
  }

  getUserShippingList(){
  	return this.http.get(this.serverPath, {headers: AppConst.createHeaderToken()});
  }

  removeShipping(id:number){
    let url = this.serverPath +"/" + id;
  	return this.http.delete(url, {headers: AppConst.createHeaderToken()});
  }
  
  setDefaultShipping(id:number){
  	return this.http.put(this.serverPath, JSON.stringify(id), {headers: AppConst.createHeaderToken()});
  }
}
