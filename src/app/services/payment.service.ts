import { Injectable } from '@angular/core';
import { AppConst } from '../constants/AppConstant';
import { Http, Headers } from '@angular/http';
import { UserPayment } from '../models/user-payment';

@Injectable()
export class PaymentService {

  private serverPath: string = AppConst.serverPath +"/payments";

  constructor(private http : Http) { }

  newPayment(payment: UserPayment) {
  	let url = this.serverPath;
  	return this.http.post(url, JSON.stringify(payment), {headers: AppConst.createHeaderToken()});
  }

  getUserPaymentList() {
  	let url = this.serverPath;
  	return this.http.get(url, {headers: AppConst.createHeaderToken()});
  }

  removePayment(id: number) {
  	let url = this.serverPath+"/"+id;
  	return this.http.delete(url, {headers: AppConst.createHeaderToken()});
  }

  setDefaultPayment (id: number) {
  	let url = this.serverPath;
  	return this.http.put(url, JSON.stringify(id), {headers: AppConst.createHeaderToken()});
  }
}