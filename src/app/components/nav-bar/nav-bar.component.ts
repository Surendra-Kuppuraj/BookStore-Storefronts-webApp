import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  public loggedIn = false;
  public keyword: string;
  public bookList:Book[] =[];

  constructor(private router:Router,
              private bookService: BookService,
              private loginService: LoginService) { }
logout() {
    this.loginService.logout().subscribe(
      res => {
         this.loggedIn = false;
        this.router.navigate(['/home']);

      },
      err => {
        console.log(err);
      }
    );
  }
  
  onSearchByTitle() {
    this.bookService.searchBook(this.keyword).subscribe(
      res=> {
        this.bookList = res.json();
        console.log(this.bookList);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "bookList" : JSON.stringify(this.bookList)
          }
        };

        this.router.navigate(['/bookList'], navigationExtras);
      },
      error=>{
        console.log(error);
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
