import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '@app/services/authentication.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@app/services/user.service';
import {first, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CustomValidators} from '@app/helpers/custom-validators';
import {AlertService} from '@app/services/alert.service';
import * as moment from 'moment';
import {User} from '@app/models/user';
import {Profile} from '@app/models/profile';

// https://github.com/jackocnr/intl-tel-input

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) { }

  get f(): { [p: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  maxDate: Date;
  minDate: Date;

  private static createRegisterForm(): FormGroup {
    // TODO: as you type formatting
    // make it easy juste type the date
    // https://medium.com/@firecube/angular-2-directives-to-format-text-as-you-type-e2c8e3ca09d8
    // https://medium.com/@amandeepkochhar/angular-material-datepicker-set-custom-date-in-dd-mm-yyyy-format-5c0f4340e57

    const todayDate = new Date();
    const currentYear = todayDate.getFullYear();
    const currentMonth = todayDate.getMonth();
    const currentDay = todayDate.getDate();

    const maxDate = new Date(currentYear - 18, currentMonth, currentDay);
    const minDate = new Date(currentYear - 100, currentMonth, currentDay);

    const phoneCountry = new FormControl('US', [
      Validators.required,
      CustomValidators.patternValidator(/[A-Z]{2}/, { invalidCountryCode: true }),
    ]);

    const password = new FormControl('', [
      Validators.required,
      CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      CustomValidators.patternValidator(/[!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?]/, { hasSpecialCharacters: true }),
      Validators.minLength(8)
    ]);

    return  new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password,
      password_confirmation: new FormControl('', [Validators.required, CustomValidators.mustMatch(password)]),
      first_name: new FormControl('', [
        Validators.maxLength(50),
        CustomValidators.patternValidator(/[a-zA-Z\u00C0-\u024F ]+/, { invalidName: true }),
        Validators.required
      ]),
      last_name: new FormControl('', [
        Validators.maxLength(50),
        CustomValidators.patternValidator(/[a-zA-Z\u00C0-\u024F ]+/, { invalidName: true }),
        Validators.required
      ]),
      birth_date: new FormControl('', [
        Validators.required,
        CustomValidators.minDate(minDate),
        CustomValidators.maxDate(maxDate),
      ]),
      phone_country: phoneCountry,
      phone_number: new FormControl('', [Validators.required, CustomValidators.validCountryPhone(phoneCountry)]),
      accept_terms: new FormControl(false, [Validators.requiredTrue])
    });
  }

  ngOnInit(): void {
    const todayDate = new Date();
    const currentYear = todayDate.getFullYear();
    const currentMonth = todayDate.getMonth();
    const currentDay = todayDate.getDate();

    this.maxDate = new Date(currentYear - 18, currentMonth, currentDay);
    this.minDate = new Date(currentYear - 100, currentMonth, currentDay);

    this.registerForm =  RegisterPageComponent.createRegisterForm();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const form = {...this.registerForm.value};
    form.birth_date = moment(form.birth_date).format('DD-MM-yyy');

    this.userService.register(form)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.authService.login(form.email, form.password)
            .pipe(first())
            .subscribe(
              response => {
                this.router.navigateByUrl('user/home').then(r => {});
              },
              error => {
                console.log(error);
                // TODO: Alert message
                this.loading = false;
              }
            );
          // TODO: authenticate user
          // this.router.navigateByUrl('/user/verify-email').then(r => {});
        },
        error => {
          console.log(error);
          this.alertService.error(error.error.message);
          this.loading = false;
        }
      );

  }

  onCountryChange($event: any): void {
    this.f.phone_country.setValue($event.iso2.toUpperCase());
  }
}
