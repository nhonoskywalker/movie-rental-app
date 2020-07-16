import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginRequest } from 'src/_shared/messages/login-request.model';
import { Router } from '@angular/router';
import { LogInService } from 'src/_shared/services/login.service';
import { AuthService } from 'src/_shared/services/auth.service';

@Component({
  selector: 'mrapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public logInForm: FormGroup;
  public loading = false;
  private logInRequest = new LoginRequest();

  constructor(
    private authService: AuthService,
    private logInService: LogInService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.logInForm.invalid || this.loading) {
      return;
    }
    this.loading = true;

    this.logInRequest.username = this.getForm['username'].value;
    this.logInRequest.password = this.getForm['password'].value;

    this.logInService.getUsers().subscribe(
      response => {
        let _user = response.find(
          user => user.username === this.logInRequest.username && user.password === this.logInRequest.password);

        if (_user) {
          if (_user.role.toLocaleLowerCase() != 'customer') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['store/movies']);
          }
        } else {
          this.snackBar.open("Log-in failed.", null, { duration: 2000 });
        }
        this.loading = false;
        localStorage.setItem('userId', _user.id);
        localStorage.setItem('userRole', _user.role);

      },
      err => {
        this.snackBar.open("Log-in failed.", null, { duration: 2000 });
        this.loading = false;
      }
    );

  }

  get getForm() { return this.logInForm.controls; }

}
