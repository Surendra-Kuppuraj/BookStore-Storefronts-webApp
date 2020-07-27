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
  selector: 'app-my-profile-payment',
  templateUrl: './my-profile-payment.component.html',
  styleUrls: ['./my-profile-payment.component.css']
})
export class MyProfilePaymentComponent implements OnInit {
 	public serverPath = AppConst.serverPath;
	public loginError:boolean;
	public loggedIn:boolean;
	public credential = {'username':'', 'password':''};

	public user: User = new User();
	public updateSuccess: boolean;
	public newPassword: string;
	public incorrectPassword: boolean;
	public currentPassword: string;

	public selectedProfileTab: number = 0;
	public selectedBillingTab: number = 0;

	public userPayment: UserPayment = new UserPayment();
	public userBilling: UserBilling = new UserBilling();
	public userPaymentList: UserPayment[] =[];
	public defaultPaymentSet:boolean;
	public defaultUserPaymentId: number;
	public stateList: string[] = [];
  public updateUserPaymentInfo = null;

  constructor(private loginService: LoginService,
  	private userService: UserService,
  	private paymentService: PaymentService,
  	private router: Router) { }
  
  selectedBillingChange(val: number) {
  	  this.selectedBillingTab = val;
  }

  setDefaultPayment() {
    this.defaultPaymentSet = false;
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultPaymentSet = true;
      },
      error => {
        console.log(error.text());
      }
    );
  }

  onUpdatePayment (payment: UserPayment) {
    this.userPayment = payment;
    this.userBilling = payment.userBilling;
    this.selectedBillingTab = 1;
  }

  onRemovePayment(id:number) {
    this.paymentService.removePayment(id).subscribe(
      res => {
        this.getCurrentUser();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  onNewPayment() {
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedBillingTab = 0;
      },
      error => {
        console.log(error.text());
      }
    );
  }
  
  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = res.json();
        this.userPaymentList = this.user.userPaymentList;

        for (let index in this.userPaymentList) {
          if(this.userPaymentList[index].defaultPayment) {
            this.defaultUserPaymentId=this.userPaymentList[index].id;
            break;
          }
        }

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

    this.userBilling.userBillingState="";
    this.userPayment.type="";
    this.userPayment.expiryMonth="";
    this.userPayment.expiryYear="";
    this.userPayment.userBilling = this.userBilling;
    this.defaultPaymentSet = false;
  }
}
