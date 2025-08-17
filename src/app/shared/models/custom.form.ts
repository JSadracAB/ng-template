import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export abstract class CustomForm<T = any> {
  // Define custom form controls and validation logic here
  public group: FormGroup;
  public fb: FormBuilder = new FormBuilder();
  public validators = Validators;

  constructor() {
    this.group = this.createFormGroup();
  }

  protected abstract createFormGroup(): FormGroup;

  get values(): T {
    const values = this.group.value;
    return values;
  }

  get valid(): boolean {
    return this.group.valid;
  }

  get invalid(): boolean {
    return this.group.invalid;
  }

  setFieldValue(field: keyof T, value: any): void {
    this.group.get(field as string)?.setValue(value);
  }

  hasFieldError(field: keyof T, error: string): boolean {
    const control = this.group.get(field as string);
    return control
      ? control.hasError(error) && (control.dirty || control.touched)
      : false;
  }
}
