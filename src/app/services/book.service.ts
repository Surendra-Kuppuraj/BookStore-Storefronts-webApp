import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppConst} from '../constants/AppConstant';


@Injectable()
export class BookService {

  private bookResourceUrl:string = AppConst.serverPath + '/book';

  constructor(private http:Http) { }

  getBookList() {
  	return this.http.get(this.bookResourceUrl, {headers: AppConst.createHeaderToken()});
  }

  getBook(id:number) {
  	let url = this.bookResourceUrl+"/"+id;
  	return this.http.get(url, {headers: AppConst.createHeaderToken()});
  }

  searchBook(keyword:string) {
  	return this.http.post(this.bookResourceUrl+"/searchBook",keyword, {headers: AppConst.createHeaderToken()});
  }

}
