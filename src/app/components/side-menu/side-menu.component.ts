import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '@/app/shared/components/toolbar/toolbar.component';
import { BreakpointService } from '@/app/core/breakpoint/breakpoint.service';

@Component({
  selector: 'app-side-menu',
  imports: [MatSidenavModule, ToolbarComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements OnInit {
  // services
  private readonly breakpointService = inject(BreakpointService);

  // variables
  public drawer = viewChild.required<MatDrawer>('drawer');

  constructor() {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    // Component initialization logic
  }
}
