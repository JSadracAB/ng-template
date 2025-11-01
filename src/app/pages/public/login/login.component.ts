import { LoginFormComponent } from '@/app/core/auth/components/login-form/login-form.component';
import { FileInputComponent } from '@/app/shared/components/file-input/file-input.component';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, FileInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor() {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    // Component initialization logic
  }
}
