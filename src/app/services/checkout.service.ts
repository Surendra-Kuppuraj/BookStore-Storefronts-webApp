import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppConst} from '../constants/AppConstant';
import {ShippingAddress} from '../models/shipping-address';
import {BillingAddress} from '../models/billing-address';
import {Payment} from '../models/payment';


@Injectable()
export class CheckoutService {

  constructor(private http: Http) { }

  checkout(
  	shippingAddress: ShippingAddress,
  	billingAddress: BillingAddress,
  	payment:Payment,
  	shippingMethod:string
  	){
		let url = AppConst.serverPath+"/checkout";
		let order ={
			"shippingAddress" : shippingAddress,
			"billingAddress" : billingAddress,
			"payment" : payment,
			"shippingMethod" : shippingMethod
		}

  	let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.post(url, order, {headers: tokenHeader});
  }

  getUserOrder() {
  	let url = AppConst.serverPath+"/checkout";

  	let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.get(url, {headers: tokenHeader});

  }


}
