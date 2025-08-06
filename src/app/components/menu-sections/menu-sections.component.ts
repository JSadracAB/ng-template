import { MenuSection } from '@/app/shared/models/menu-section.model';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-sections',
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
  ],
  templateUrl: './menu-sections.component.html',
  styleUrl: './menu-sections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSectionsComponent implements OnInit {
  // inputs
  sections = input.required<MenuSection[]>();

  ngOnInit(): void {
    // Initialization logic can go here
  }

  constructor() {
    // Constructor logic can go here
  }
}
