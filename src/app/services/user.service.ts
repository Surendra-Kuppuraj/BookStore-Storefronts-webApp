import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { AppConst } from '../constants/AppConstant';
import {User} from '../models/user';


@Injectable()
export class UserService {
  private serverPath: string = AppConst.serverPath +'/users';

  constructor(private http:Http) { }

  newUser(userName: string, email:string) {
	  	let url = this.serverPath;
	  	let userInfo = {
	  		"userName" : userName,
	  		"email" : email
	  	}
	  	return this.http.post(url, JSON.stringify(userInfo), {headers : AppConst.createHeaderToken()});
  }

  updateUserInfo(user: User, newPassword: string, currentPassword: string) {
    let url = this.serverPath;
    let userInfo = {
      "id" : user.id,
      "firstName" : user.firstName,
      "lastName" : user.lastName,
      "username" : user.username,
      "currentPassword" : currentPassword,
      "email" : user.email,
      "newPassword" :newPassword
    };
    return this.http.put(url, JSON.stringify(userInfo), {headers:AppConst.createHeaderToken()});
  }

  retrievePassword(email:string) {
	  	let userInfo = {
	  		"email" : email
	  	}
	  	return this.http.patch(this.serverPath, JSON.stringify(userInfo), {headers : AppConst.createHeaderToken()});
  }
 
  getCurrentUser() {
    let tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(this.serverPath, {headers : tokenHeader});
  }
}
