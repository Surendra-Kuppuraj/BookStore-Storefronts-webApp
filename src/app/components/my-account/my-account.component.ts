import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { AppConst } from '../../constants/AppConstant';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public loginError:boolean = false;
  public loggedIn = false;
  public credential = {'username':'', 'password':''};

  public emailSent: boolean =false;
  public usernameExists:boolean;
  public emailExists:boolean;
  public username:string;
  public email:string;

  public emailNotExists: boolean =false;
  public forgetPasswordEmailSent: boolean;
  public recoverEmail:string;

  constructor(private loginService: LoginService,
  	private userService: UserService,
  	private router: Router) {

  	}

  	onLogin() {
  	  	this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
  	  		res => {
  	  			console.log(res);
  	  			localStorage.setItem("xAuthToken", res.json().token);
            this.loggedIn = true;
  	  			this.router.navigate(['/home']);
                        location.reload();

  	  		}, 
  	  		error => {
  	  			this.loggedIn = false;
  	  			this.loginError = true;
  	  		}
  	  	);
  	  }

    onNewAccount() {
        this.usernameExists = false;
        this.emailExists = false;
        this.emailSent = false;

        this.userService.newUser(this.username, this.email).subscribe(
          res => {
            console.log(res);
            this.emailSent = true;
          }, 
          error => {
            console.log(error);
            let value = error.status;
            let errorMessage = error.text();
            if(errorMessage==AppConst.USERNAME_EXISTS) this.usernameExists=true;
            if(errorMessage==AppConst.EMAIL_EXISTS) this.emailExists=true;
          }
        );
    }

   onForgetPassword() {
        this.forgetPasswordEmailSent = false;
        this.emailNotExists = false;

        this.userService.retrievePassword(this.recoverEmail).subscribe(
          res => {
            console.log(res);
            this.forgetPasswordEmailSent = true;
          },
          error => {
            console.log(error.text());
            let errorMessage = error.text();
            if(errorMessage == AppConst.EmailNotFound) this.emailNotExists=true;
          }
        );
    }

	  ngOnInit() {
        this.loginService.checkSession().subscribe(
          res => {
            this.loggedIn = true;
          },
          error => {
            this.loggedIn = false;
          }
        );
    }
  }