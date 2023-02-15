import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddbooksService } from './addbooks.service';

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.scss'],
})
export class AddbooksComponent implements OnInit {
  error: string | undefined;
  addForm!: FormGroup;
  isLoading = false;
  errTrue: boolean | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private addbookService: AddbooksService,
    private toastr: ToastrService

  ) {
    this.createForm();
  }
  data: any;

  ngOnInit(): void {
    this.addbookService.getCategory().subscribe((response: any) => {
      this.data = response;
    });
  }
  // ADD BOOKS
  add() {
    if (this.addForm.valid) {
      this.isLoading = true;
      const requestBody = {
        bookname: this.addForm.value.bookname,
        isbn: this.addForm.value.isbn,
        author: this.addForm.value.author,
        category_id: this.addForm.value.category,
        price: this.addForm.value.price,
        admin_id: this.addForm.value.adminid,
      };
      this.addbookService.addbook(requestBody).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.toastr.success('Books Added successfully');
          this.router.navigate(['/booklist']);
        },
        (error: any) => {
          this.isLoading = false;
          this.errTrue = true;
          this.toastr.error(error);
        }
      );
    }
  }
  // VALIDATING FORM
  private createForm() {
    this.addForm = this.formBuilder.group({
      isbn: ['', [Validators.required, this.isbnValidator]],
      bookname: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      adminid: ['', Validators.required],
      remember: true,
    });
  }

  isbnValidator(control: AbstractControl) {
    if (control.value) {
      if (control.value.length < 13 || !/^\d+$/.test(control.value)) {
        return { invalidIsbn: true };
      }
    }
    return null;
  }
}
