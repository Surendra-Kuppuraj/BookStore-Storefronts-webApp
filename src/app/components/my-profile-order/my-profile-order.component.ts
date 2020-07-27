import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-my-profile-order',
  templateUrl: './my-profile-order.component.html',
  styleUrls: ['./my-profile-order.component.css']
})
export class MyProfileOrderComponent implements OnInit {

  public orderList: Order[] = [];
  public order:Order = new Order();
  public user: User = new User();
  public dataFetched = false;
  public displayOrderDetail:boolean;
  public loginError:boolean;
  public loggedIn:boolean;

  constructor(private loginService: LoginService,
  			  private orderService: OrderService,
  			  private userService: UserService,
  	          private router: Router) { }

  onDisplayOrder(order: Order) {
    console.log(order);
    this.order=order;
    this.displayOrderDetail=true;
  }

  getCurrentUser() {
  	this.userService.getCurrentUser().subscribe(
  		res => {
  			this.user = res.json();
  			this.dataFetched = true;
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

    this.orderService.getOrderList().subscribe(
       res => {
         this.orderList = res.json();
        },
        error => {
          console.log(error.text());
        }
      );
  }

}
