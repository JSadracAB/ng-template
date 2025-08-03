import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from '@/app/shared/components/toolbar/toolbar.component';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  imports: [ToolbarComponent, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  // outputs
  public menu = input.required<MatDrawer>();

  constructor() {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  toggleMenu(): void {
    // Logic to handle menu toggle can go here
    console.log('Menu toggled');
    this.menu().open();
  }
}
