import { CustomForm } from '@/app/shared/models/custom.form';
import { passwordMatchValidator } from '@/app/shared/validators';
import { FormGroup } from '@angular/forms';

export interface RegistrationFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export class RegistrationForm extends CustomForm<RegistrationFormValues> {
  constructor() {
    super();
  }

  protected override createFormGroup(): FormGroup {
    const { required, email, minLength, requiredTrue } = this.validators;

    return this.fb.group(
      {
        email: ['', [required, email]],
        password: ['', [required, minLength(8)]],
        confirmPassword: ['', [required]],
        acceptTerms: [false, [requiredTrue]],
      },
      { validators: passwordMatchValidator() }
    );
  }
}
