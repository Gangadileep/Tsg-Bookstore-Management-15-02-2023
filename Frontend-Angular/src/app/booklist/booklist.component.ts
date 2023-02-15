import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooklistService } from './booklist.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss'],
})
export class BooklistComponent implements OnInit {
  data: any;
  book: any;
  isbn: any;

  constructor(private booklistService: BooklistService, private route: ActivatedRoute,private _router:Router,private toastr: ToastrService) { }
ngOnInit(): void {
  this.booklistService.getBooks().subscribe((response: any) => {
    console.log(response);
    this.data = response;});
    }
 // DELETE BOOK
deleteBook(isbn: string) {
  alert(`Are you sure you want to delete isbn ${isbn}`);
  this.booklistService.deletebook(isbn).subscribe((response: any) => {
    console.log(response);
    this.data = response;
    this.toastr.success('Book Deleted successfully');
    window.location.reload();
    });
  }
// UPDATE FUNCTION
edit(id: any){
  console.log(id);
  this._router.navigate(['update'], { queryParams:{ id: id } });}
}




