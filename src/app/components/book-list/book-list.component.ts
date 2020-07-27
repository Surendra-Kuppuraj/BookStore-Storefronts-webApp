import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import {AppConst} from '../../constants/AppConstant';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public filterQuery = '';
  public rowsOnPage = 5;
  public sortOrder ="asc";
  public sortBy= "name";
  public selectedBook: Book;
  public bookList: Book[];
  public serverPath = AppConst.serverPath;

  constructor(
    private bookService: BookService,
    private router: Router,
    private http: Http,
    private route: ActivatedRoute
  ) {}

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params['bookList']) {
        console.log("filtered book list");
        this.bookList = JSON.parse(params['bookList']);
      } else {
        this.bookService.getBookList().subscribe(
          res => {
            console.log(res.json());
            this.bookList = res.json();
          },
          err => {
            console.log(err);
          }
          );
      }
    });

  }

}
