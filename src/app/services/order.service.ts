import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppConst} from '../constants/AppConstant';
import {Order} from '../models/order';

@Injectable()
export class OrderService {

  constructor(private http:Http) { }

  getOrderList() {
  	let url = AppConst.serverPath+"/order";
  	return this.http.get(url, {headers: AppConst.createHeaderToken()});
  }

}
