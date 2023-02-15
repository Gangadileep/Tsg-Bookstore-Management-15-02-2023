import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from './authentication.service';
import { CredentialsService } from './credentials.service';
import { ToastrService } from 'ngx-toastr';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  errTrue: boolean | undefined;
  classList: any;
  passwordToggle: any;
  passwordInput: any;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private _credentialService: CredentialsService,
    private toastr: ToastrService
  ) {
    this.createForm();
    // this.setupPasswordToggle();
  }

  ngOnInit() { }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authenticationService.login(this.loginForm.value).subscribe(
        (response) => {
          this.isLoading = false;
          console.log('response', response);
          this._credentialService.setCredentials(response);
          if (response.type == 1) {
            this.toastr.success('Admin Login successfull');
            this.router.navigate(['/home']);
          }
          if (response.type == 2) {
            this.toastr.success('User Login successfull');
            this.router.navigate(['/user']);
          }
          const usertype = response.type;
          console.log('usertype', usertype);
        },
        (error) => {
          this.isLoading = false;
          this.errTrue = true;
          console.log('response', error);
          this.toastr.error('The username or password is incorrect. Please try again.');
        }
      );
    }
  }
  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)]],
      remember: true,
    });
  }

}


