import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  error: string | undefined;
  editForm!: FormGroup;
  isLoading = false;
  errTrue: boolean | undefined;

  id:any;
  book: any;
  books: any;


constructor(private updateService: UpdateService, private route: ActivatedRoute, private router:Router, private formBuilder:FormBuilder,private toastr: ToastrService) 
{this.createForm();}
data: any;

ngOnInit(): void {
  this.id = this.route.snapshot.params['id'];
  console.log('id',this.id);
  this.getBook(this.id);
  this.getEditCategory()
}
// GETTING BOOK BY ID
getBook(id: any){
  this.updateService.getOneBook(id).subscribe((response:any) => {
    this.isLoading = false;
    this.data = response;

    this.editForm = new FormGroup({
      bookname: new FormControl(response.bookname),
      isbn: new FormControl(response.isbn),
      author:new FormControl(response.author),
      category: new FormControl(response.category),
      price: new FormControl(response.price),
      adminid: new FormControl(response.admin_id)
    })
  })
  
}
//GETTING CATEGORY
getEditCategory(){
  this.updateService.getCategory().subscribe((response: any) => {
    this.data = response;
  });
}
// UPDATE BOOK DETAILS
edit(id:any) {
    if (this.editForm.valid) {
      this.isLoading = true;

      const requestBody = {
        bookname: this.editForm.value.bookname,
        isbn: this.editForm.value.isbn,
        author: this.editForm.value.author,
        category_id: this.editForm.value.category,
        price: this.editForm.value.price,
        admin_id: this.editForm.value.adminid,
      };
      this.updateService.updateBook(id,requestBody).subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success("Updated susceesfully")
          this.router.navigate(['/booklist']);
        },
        (error: any) => {
          this.isLoading = false;
          this.errTrue = true;
          this.toastr.error(error.error.error)
         
        }
      );
    }
  }
// VALIDATION ON FIELDS
private createForm() {
  this.editForm = this.formBuilder.group({
    isbn: ['', [Validators.required]],
    bookname: ['', Validators.required],
    author: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    adminid: ['', Validators.required],
    remember: true,
  });
}
}