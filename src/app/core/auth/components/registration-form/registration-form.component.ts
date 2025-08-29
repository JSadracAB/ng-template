import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { RegistrationForm } from './registration.form';

@Component({
  selector: 'app-registration-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
  // services
  private readonly authService = inject(AuthService);

  // variables
  protected form = new RegistrationForm();
  protected hidePassword = signal<boolean>(true);
  protected hideConfirmPassword = signal<boolean>(true);

  constructor() {}

  ngOnInit(): void {
    // Component initialization logic
    console.log('🚀 ~ RegistrationFormComponent ~ initialized');
  }

  togglePasswordVisibility(): void {
    this.hidePassword.update((value) => !value);
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword.update((value) => !value);
  }

  doRegister() {
    if (!this.form.valid) {
      // Mark all fields as touched to show validation errors
      this.form.group.markAllAsTouched();
      return;
    }

    console.log('Registration form values:', this.form.values);
    this.authService.register(this.form.values);
  }
}
