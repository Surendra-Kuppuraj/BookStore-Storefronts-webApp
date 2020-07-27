import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/AppConstant';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { UserPayment } from '../../models/user-payment';
import { UserBilling } from '../../models/user-billing';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public serverPath = AppConst.serverPath;
  public dataFetched = false;
  public loginError:boolean;
  public loggedIn:boolean;
  public credential = {'username':'', 'password':''};

  public user: User = new User();
  public updateSuccess: boolean;
  public newPassword: string;
  public incorrectPassword: boolean;
  public currentPassword: string;

  public selectedProfileTab: number = 0;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private paymentService: PaymentService,
    private router: Router
    ) { }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.dataFetched = true;
        this.user = res.json();
        console.log(res.json());
      },
      err => {
        console.log(err);
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

}
