import { LoginFormComponent } from '@/app/core/auth/components/login-form/login-form.component';
import { FilePondComponent } from '@/app/shared/components/file-pond/file-pond.component';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, FilePondComponent],
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
