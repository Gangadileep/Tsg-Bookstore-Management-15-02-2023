import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'; // add FormBuilder
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/auth/authentication.service';
import { UserviewService } from './userview.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.scss'],
})
export class UserviewComponent implements OnInit {
  response: any;
  searchForm!: FormGroup;
  isLoading: boolean | undefined;
  books: any;
  data: any;

  constructor(
    private userviewService: UserviewService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder // inject FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({ // initialize searchForm
      search_value: ['']
    });

    this.userviewService.getBook().subscribe((response: any) => {
      this.data = response;
      this.books = response;
    });
  }
// SEARCH BY BOOKNAME OR AUTHOR
  search() {
    if (this.searchForm.valid) {
      this.isLoading = true;
      const requestBody = {
        search_value: this.searchForm.value.search_value,
      };
      this.userviewService.searchBook(requestBody).subscribe(
        (response: any) => {
          this.books = response;
        },
      );
    }
  }
  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
}


  

