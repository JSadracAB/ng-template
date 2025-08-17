import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
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
import { AuthService } from '../../auth.service';
import { LoginForm } from './login.form';

@Component({
  selector: 'app-login-form',
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
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  // services
  private readonly authService = inject(AuthService);

  // inputs
  hasForgotPassword = input<boolean>(false);
  hasRegister = input<boolean>(false);

  // variables
  protected form = new LoginForm();
  protected hidePassword = signal<boolean>(true);

  constructor() {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    // Component initialization logic
    const values = this.form.values;

    console.log('🚀 ~ LoginFormComponent ~ form:', this.form.values);
  }

  togglePasswordVisibility(): void {
    this.hidePassword.update((value) => !value);
  }

  doLogin() {
    if (!this.form.valid) return;
    this.authService.login(this.form.values);
  }
}
