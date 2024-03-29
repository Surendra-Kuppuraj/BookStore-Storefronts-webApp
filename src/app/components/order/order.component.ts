import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/AppConstant';
import {Book} from '../../models/book';
import {Router, NavigationExtras} from "@angular/router";
import {CartService} from '../../services/cart.service';
import {ShippingService} from '../../services/shipping.service';
import {PaymentService} from '../../services/payment.service';
import {CheckoutService} from '../../services/checkout.service';
import {CartItem} from '../../models/cart-item';
import {ShoppingCart} from '../../models/shopping-cart';
import {ShippingAddress} from '../../models/shipping-address';
import {BillingAddress} from '../../models/billing-address';
import {UserPayment} from '../../models/user-payment';
import {UserBilling} from '../../models/user-billing';
import {UserShipping} from '../../models/user-shipping';
import {Payment} from '../../models/payment';
import {Order} from '../../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public serverPath = AppConst.serverPath;
  public selectedBook: Book;
  public cartItemList: CartItem[] = [];
  public cartItemNumber: number;
  public shoppingCart: ShoppingCart = new ShoppingCart();
  public cartItemUpdated:boolean;
  public shippingAddress:ShippingAddress=new ShippingAddress();
  public billingAddress:BillingAddress = new BillingAddress();
  public userPayment:UserPayment = new UserPayment();
  public userShipping:UserShipping = new UserShipping();
  public userBilling: UserBilling = new UserBilling();
  public userShippingList: UserShipping[] = [];
  public userPaymentList: UserPayment[] = [];
  public payment: Payment = new Payment();
  public selectedTab: number;
  public emptyShippingList: boolean = true;
  public emptyPaymentList: boolean = true;
  public stateList: string[] = [];
  public shippingMethod:string;
  public order:Order = new Order();
  public missingRequiredField=  true;

  constructor(
    private router:Router, 
    private cartService: CartService, 
    private shippingService: ShippingService,
    private paymentService: PaymentService,
    private checkoutService: CheckoutService
    ) { }

  onSelect(book:Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  selectedChange(val :number ){
    this.selectedTab=val;
  }

  goToPayment() {
    this.selectedTab=1;
  }

  goToReview() {
    this.selectedTab=2;
  }

  getCartItemList(){
    this.cartService.getCartItemList().subscribe(
      res=>{
        this.cartItemList = res.json();
        this.cartItemNumber = this.cartItemList.length;
      },
      error=>{
        console.log(error.text());
      }
      );
  }

  setShippingAddress(userShipping: UserShipping) {
    this.shippingAddress.shippingAddressName = userShipping.address.name;
    this.shippingAddress.shippingAddressStreet1 = userShipping.address.street1;
    this.shippingAddress.shippingAddressStreet2 = userShipping.address.street2;
    this.shippingAddress.shippingAddressCity = userShipping.address.city;
    this.shippingAddress.shippingAddressState = userShipping.address.state;
    this.shippingAddress.shippingAddressCountry = userShipping.address.country;
    this.shippingAddress.shippingAddressZipcode = userShipping.address.zipcode;
  }

  setPaymentMethod(userPayment: UserPayment) {
    this.payment.type = userPayment.type;
    this.payment.cardNumber = userPayment.cardNumber;
    this.payment.expiryMonth = userPayment.expiryMonth;
    this.payment.expiryYear = userPayment.expiryYear;
    this.payment.cvc = userPayment.cvc;
    this.payment.holderName = userPayment.holderName;
    this.payment.defaultPayment = userPayment.defaultPayment;
    this.billingAddress.billingAddressName = userPayment.userBilling.userBillingName;
    this.billingAddress.billingAddressStreet1 = userPayment.userBilling.userBillingStreet1;
    this.billingAddress.billingAddressStreet2 = userPayment.userBilling.userBillingStreet2;
    this.billingAddress.billingAddressCity = userPayment.userBilling.userBillingCity;
    this.billingAddress.billingAddressState = userPayment.userBilling.userBillingState;
    this.billingAddress.billingAddressCountry = userPayment.userBilling.userBillingCountry;
    this.billingAddress.billingAddressZipcode = userPayment.userBilling.userBillingZipcode;
  }

  setBillingAsShipping(checked:boolean){
    console.log("same as shipping")

    if(checked) {
      this.billingAddress.billingAddressName = this.shippingAddress.shippingAddressName;
      this.billingAddress.billingAddressStreet1 = this.shippingAddress.shippingAddressStreet1;
      this.billingAddress.billingAddressStreet2 = this.shippingAddress.shippingAddressStreet2;
      this.billingAddress.billingAddressCity = this.shippingAddress.shippingAddressCity;
      this.billingAddress.billingAddressState = this.shippingAddress.shippingAddressState;
      this.billingAddress.billingAddressCountry = this.shippingAddress.shippingAddressCountry;
      this.billingAddress.billingAddressZipcode = this.shippingAddress.shippingAddressZipcode;
    } else {
      this.billingAddress.billingAddressName = "";
      this.billingAddress.billingAddressStreet1 = "";
      this.billingAddress.billingAddressStreet2 = "";
      this.billingAddress.billingAddressCity = "";
      this.billingAddress.billingAddressState = "";
      this.billingAddress.billingAddressCountry = "";
      this.billingAddress.billingAddressZipcode = "";
    }
  }

  onSubmit(){
    this.checkoutService.checkout(
      this.shippingAddress,
      this.billingAddress,
      this.payment,
      this.shippingMethod
      ).subscribe(
      res=>{
        this.order=res.json();
        console.log(this.order);

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "order": JSON.stringify(this.order)
            }
        };

        this.router.navigate(['/orderSummary'], navigationExtras);
      },
      error=>{
        console.log(error.text());
      }
      );
    }

    ngOnInit() {
      this.getCartItemList();


      this.cartService.getShoppingCart().subscribe(
        res=>{
          console.log(res.json());
          this.shoppingCart=res.json();
        },
        error=>{
          console.log(error.text());
        }
        );

      this.shippingService.getUserShippingList().subscribe(
        res=>{
          console.log(res.json());
          this.userShippingList=res.json();
          if(this.userShippingList.length) {
            this.emptyShippingList = false;

            for (let userShipping of this.userShippingList) {
              if(userShipping.userShippingDefault) {
                this.setShippingAddress(userShipping);
                return;
              }
            }
          }
        },
        error=>{
          console.log(error.text());
        }
        );

      this.paymentService.getUserPaymentList().subscribe(
        res=>{
          console.log(res.json());
          this.userPaymentList=res.json();
          this.emptyPaymentList = false;

          if(this.userPaymentList.length) {
            this.emptyPaymentList = false;

            for (let userPayment of this.userPaymentList) {
              if(userPayment.defaultPayment) {
                this.setPaymentMethod(userPayment);
                return;
              }
            }
          }
        },
        error=>{
          console.log(error.text());
        }
        );

      

      this.payment.type="";
      this.payment.expiryMonth="";
      this.payment.expiryYear="";
      this.billingAddress.billingAddressState="";
      this.shippingAddress.shippingAddressState="";
      this.shippingMethod="groundShipping";
    }
 }