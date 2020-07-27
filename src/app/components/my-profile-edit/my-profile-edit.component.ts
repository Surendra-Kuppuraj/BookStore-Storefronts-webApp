import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.css']
})
export class MyProfileEditComponent implements OnInit {

  public user: User = new User();
  public updateSuccess: boolean;
  public newPassword: string;
  public incorrectPassword: boolean;
  public currentPassword: string;
  public loginError:boolean;
  public loggedIn:boolean;
  public usernameExists= true;
  public updateUserInfo = null;
  public updateEmailExists = true;
  public userNameExists = true;
  public emailExists = true;

 constructor(private loginService: LoginService,
 	private userService:UserService,    
 	private router: Router){ }

 onUpdateUserInfo () {
    this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
      res => {
        console.log(res.text());
        this.updateSuccess=true;
      },
      error => {
        console.log(error.text());
        let errorMessage = error.text();
        if(errorMessage=="Incorrect current password!") this.incorrectPassword=true;
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
        console.log("inactive session");
        this.router.navigate(['/myAccount']);
      }
    );

    this.getCurrentUser();
  }

 getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = res.json();
        console.log(res.json());
      },
      err => {
        console.log(err);
      }
    );
  }
}
