import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from '@/app/shared/components/toolbar/toolbar.component';
import { BreakpointService } from '@/app/core/breakpoint/breakpoint.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuSection } from '@/app/shared/models/menu-section.model';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-side-menu',
  imports: [
    MatSidenavModule,
    ToolbarComponent,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    TranslateModule,
    MatMenuModule,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements OnInit {
  // services
  private readonly breakpointService = inject(BreakpointService);

  // variables
  public drawer = viewChild.required<MatSidenav>('drawer');
  protected isDesktop = computed(() => this.breakpointService.isDesktop());

  // constants
  protected readonly menuSections = signal<MenuSection[]>([
    {
      title: 'APP.SIDE_MENU.LOGIN', // Login
      icon: 'login',
      route: '/login',
    },
  ]);

  constructor() {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    // Component initialization logic
  }
}
