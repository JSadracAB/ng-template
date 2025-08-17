import { CustomForm } from '@/app/shared/models/custom.form';
import { FormGroup } from '@angular/forms';

export interface LoginFormValues {
  credential: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginFormParams {
  credential?: string;
}

export class LoginForm extends CustomForm<LoginFormValues> {
  constructor(params?: LoginFormParams) {
    super();
    if (params) {
      this.setFieldValue('credential', params.credential || '');
    }
  }

  protected createFormGroup(): FormGroup {
    // Define the form controls and their initial values
    const { required } = this.validators;
    return this.fb.group({
      credential: ['', [required]],
      password: ['', [required]],
      rememberMe: [false, []],
    });
  }
}
