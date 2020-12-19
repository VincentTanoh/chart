import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as libphonenumber from 'google-libphonenumber';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any} | null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static mustMatch(matchingControl: AbstractControl): ValidatorFn {
    let subscribe = false;

    return (control: AbstractControl): {[key: string]: any} | null => {

      // subscribe to matchingControl changes
      if (!subscribe) {
        subscribe = true;
        matchingControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity();
        });
      }

      if (control.errors && !control.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        return {
          mustMatch: true
        };
      } else {
        return null;
      }
    };
  }

  static validCountryPhone(countryControl: AbstractControl): ValidatorFn {
    let subscribe = false;

    return (phoneControl: AbstractControl): {[key: string]: any} | null => {
      // subscribe to countryControl changes
      if (!subscribe) {
        subscribe = true;
        countryControl.valueChanges.subscribe(() => {
          phoneControl.updateValueAndValidity();
        });
      }

      if (phoneControl.value !== '') {
        try {
          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          const phoneNumber = '' + phoneControl.value + '';
          const region = countryControl.value;
          const pNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, region);
          const isValidNumber = phoneUtil.isValidNumber(pNumber);

          if (isValidNumber) {
            return null;
          }
        }
        catch (e) {
          return {
            validCountryPhone: true
          };
        }
        return {
          validCountryPhone: true
        };
      }
      else {
        return null;
      }
    };
  }

  static minDate(minDate: Date): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const date = new Date(control.value);

      if (control.errors && !control.errors.minDate) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      return (date > minDate) ? null : { minDate: true } ;
    };
  }

  static maxDate(maxDate: Date): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const date = new Date(control.value);

      if (control.errors && !control.errors.maxDate) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      return (date < maxDate) ? null : { maxDate: true } ;
    };
  }
}
