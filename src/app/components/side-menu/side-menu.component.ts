import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-menu',
  imports: [MatSidenavModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements OnInit {
  // Signals can be used here if needed
  // Example: mySignal = signal('Initial value');

  constructor() {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    // Component initialization logic
  }
}
