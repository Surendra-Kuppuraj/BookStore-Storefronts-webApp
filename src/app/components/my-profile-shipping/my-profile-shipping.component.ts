import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/AppConstant';
import { Router } from '@angular/router';
import { ShippingService } from '../../services/shipping.service';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { UserShipping } from '../../models/user-shipping';
import { Address } from '../../models/address';


@Component({
  selector: 'app-my-profile-shipping',
  templateUrl: './my-profile-shipping.component.html',
  styleUrls: ['./my-profile-shipping.component.css']
})
export class MyProfileShippingComponent implements OnInit {

  public selectedShippingTab:number;
  public userShipping:UserShipping = new UserShipping();
  public address:Address = new Address();
  public user: User = new User();
  public userShippingList: UserShipping[] = [];
  public defaultShippingSet:boolean;
  public defaultUserShippingId: number;

  public dataFetched = false;
  public loginError:boolean;
  public loggedIn:boolean;
  public stateList = null;

  public updateUserShippingInfo = true


  constructor(private loginService: LoginService,
  	          private userService: UserService,
  	          private shippingService: ShippingService, 
  	          private router:Router) { 
  }
 
  selectedShippingChange(val: number) {
  	  this.selectedShippingTab = val;
  }

  onNewShipping(){
  	this.shippingService.newShipping(this.userShipping).subscribe(
  		res => {
  			this.getCurrentUser();
  			this.selectedShippingTab = 0;
  		},
  		error => {
  			console.log(error.text());
  		}
  	);
  }

  onUpdateShipping(shipping: UserShipping){
   this.userShipping = shipping;
   this.userShipping.address = shipping.address;
   this.selectedShippingTab = 1;
  }

  onRemoveShipping(id: number){
  	this.shippingService.removeShipping(id).subscribe(
  		res => {
  			this.getCurrentUser();
  		},
  		error =>{
  			console.log(error.text());
  		}
  	);
  }

  setDefaultShipping() {
    this.defaultShippingSet = false;
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultShippingSet = true;
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
        this.userShippingList = this.user.userShippingList;
        for (let index in this.userShippingList) {
          if(this.userShippingList[index].userShippingDefault) {
            this.defaultUserShippingId=this.userShippingList[index].id;
            break;
          }
        }
        this.dataFetched = true;
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
    this.userShipping.address.state="";
    this.defaultShippingSet=false;
  }

}
