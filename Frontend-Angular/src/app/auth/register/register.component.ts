import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  registerForm!: FormGroup;
  isLoading = false;
  errTrue: boolean | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}
  register() {
    console.log('form is validated');
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authenticationService.register(this.registerForm.value);
      console.log('form value', this.registerForm.value);
      console.log(this.registerForm.value);
      console.log('this.registerForm.valid', this.registerForm.value);
      this.authenticationService.register(this.registerForm.value).subscribe(
        (response: any) => {
          this.isLoading = false;
          console.log('response', response);
          this.toastr.success('User Registration successfull');
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.isLoading = false;
          this.errTrue = true;
          this.toastr.error(error.error.error);
          // this.toastr.error(error)
          console.log('response', error);
        }
      );
    }
  }
  private createForm() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]], // added minimum length and pattern validators
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]*')]], // added minimum length and pattern validators
      password: ['', [Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)]], // added minimum length validator
      remember: true,
    });
  }
  
}  
