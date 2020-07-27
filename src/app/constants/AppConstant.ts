import { Http, Headers } from '@angular/http';

export class AppConst {
	//public static serverPath ='https://bookbackend.herokuapp.com';
	public static serverPath ='http://127.0.0.1:9090';
	public static EmailNotFound = "EmailNotFound";
	public static USERNAME_EXISTS = "User Name Exists";
	public static EMAIL_EXISTS = "Email Exists";
	public static xAuthToken = "xAuthToken";

	public static createHeaderToken(){
  	let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return tokenHeader;
  }


}