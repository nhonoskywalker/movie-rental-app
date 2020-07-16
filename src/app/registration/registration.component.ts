import { Component, OnInit } from '@angular/core';
import { UserRegistrationRequest } from './../../_shared/messages/user-registration-request.model';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from './../../_shared/services/user-registration.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mrapp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted = false;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private registerService: UserRegistrationService,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      email: ['', [Validators.required]],
    });


  }

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }


  async onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid || this.loading) {
      return;
    }
    this.loading = true;

    let registerRequest = new UserRegistrationRequest();
    registerRequest.username = this.getForm['username'].value;
    registerRequest.password = this.getForm['password'].value;
    registerRequest.email = this.getForm['email'].value;
    registerRequest.role = this.route.snapshot.paramMap.get("role");
    console.log(registerRequest);
    try {
      (await this.registerService.register(registerRequest)).subscribe(
        response =>{
          this.loading = false;
          this.snackBar.open("Registration success!", null, { duration: 2000 });
        },
        error =>{
          this.loading = false;
          this.snackBar.open(error, null, { duration: 2000 });
        }
      );
    } catch (error) {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      console.log(error);
    }

  }

  get getForm() { return this.registerForm.controls; }


}
