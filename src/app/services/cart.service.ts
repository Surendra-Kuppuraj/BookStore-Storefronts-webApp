import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppConst} from '../constants/AppConstant';

@Injectable()
export class CartService {

  private url:string = AppConst.serverPath+"/cart";

  constructor(private http:Http) { }

  addItem(id:number, qty: number) {
  	let cartItemInfo = {
  		"bookId" : id,
  		"qty" : qty
  	}
  	return this.http.post(this.url, cartItemInfo, {headers: AppConst.createHeaderToken()});
  }

  getCartItemList() {
  	let urlSubResource = this.url+"/items";
  	return this.http.get(urlSubResource, {headers: AppConst.createHeaderToken()});
  }

  getShoppingCart() {
  	return this.http.get(this.url, {headers: AppConst.createHeaderToken()});
  }

  updateCartItem(cartItemId: number, qty: number) {
  	let cartItemInfo = {
  		"cartItemId" : cartItemId,
  		"qty" : qty
  	}
  	return this.http.put(this.url, cartItemInfo, {headers:AppConst.createHeaderToken()});
  }

  removeCartItem(id: number) {
  	let urlSubResource = this.url +"/"+id;
  	return this.http.delete(urlSubResource, {headers: AppConst.createHeaderToken()});
  }
}
