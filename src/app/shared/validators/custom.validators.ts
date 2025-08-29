/**
 * Custom validators for Angular reactive forms
 * These validators can be reused across different forms in the application
 */

import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

/**
 * Validator to check if password and confirm password fields match
 * Should be applied at the form group level
 * @returns ValidatorFn that validates password confirmation
 */
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  };
}

/**
 * Validator to check password strength
 * Requires at least 8 characters with uppercase, lowercase, number and special character
 * @param minLength Minimum password length (default: 8)
 * @returns ValidatorFn that validates password strength
 */
export function strongPasswordValidator(minLength: number = 8): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // Let required validator handle empty values
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    const hasMinLength = value.length >= minLength;

    const errors: ValidationErrors = {};

    if (!hasMinLength) {
      errors['minLength'] = {
        requiredLength: minLength,
        actualLength: value.length,
      };
    }

    if (!hasUpperCase) {
      errors['missingUppercase'] = true;
    }

    if (!hasLowerCase) {
      errors['missingLowercase'] = true;
    }

    if (!hasNumeric) {
      errors['missingNumeric'] = true;
    }

    if (!hasSpecialChar) {
      errors['missingSpecialChar'] = true;
    }

    return Object.keys(errors).length > 0 ? { weakPassword: errors } : null;
  };
}

/**
 * Validator to check if email domain is allowed
 * @param allowedDomains Array of allowed email domains
 * @returns ValidatorFn that validates email domain
 */
export function allowedEmailDomainsValidator(
  allowedDomains: string[]
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // Let required validator handle empty values
    }

    const email = value.toLowerCase();
    const domain = email.split('@')[1];

    if (
      !domain ||
      !allowedDomains.some(
        (allowedDomain) => domain === allowedDomain.toLowerCase()
      )
    ) {
      return { forbiddenEmailDomain: { allowedDomains, actualDomain: domain } };
    }

    return null;
  };
}

/**
 * Validator to check if username is unique (async validator example)
 * Note: This is a template - you'd need to inject a service to check against backend
 * @param checkUsernameService Service to check username availability
 * @returns ValidatorFn that validates username uniqueness
 */
// export function uniqueUsernameValidator(checkUsernameService: any): AsyncValidatorFn {
//   return (control: AbstractControl): Observable<ValidationErrors | null> => {
//     if (!control.value) {
//       return of(null);
//     }
//
//     return checkUsernameService.checkUsername(control.value).pipe(
//       map(isUnique => isUnique ? null : { usernameTaken: true }),
//       catchError(() => of(null))
//     );
//   };
// }

/**
 * Validator to check if a value matches a specific pattern with custom error message
 * @param pattern Regular expression pattern
 * @param errorKey Custom error key
 * @returns ValidatorFn that validates against pattern
 */
export function customPatternValidator(
  pattern: RegExp,
  errorKey: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    return pattern.test(value)
      ? null
      : { [errorKey]: { pattern: pattern.toString(), actualValue: value } };
  };
}

/**
 * Validator to check if two form controls have the same value
 * More generic version of passwordMatchValidator
 * @param controlName Name of the first control
 * @param matchingControlName Name of the control that should match
 * @param errorKey Custom error key (default: 'mismatch')
 * @returns ValidatorFn that validates field matching
 */
export function fieldMatchValidator(
  controlName: string,
  matchingControlName: string,
  errorKey: string = 'mismatch'
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const field = formGroup.get(controlName);
    const matchingField = formGroup.get(matchingControlName);

    if (!field || !matchingField) {
      return null;
    }

    return field.value === matchingField.value
      ? null
      : { [errorKey]: { controlName, matchingControlName } };
  };
}
