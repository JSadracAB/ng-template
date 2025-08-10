import { inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  // services
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isMobile = signal<boolean | undefined>(undefined);
  readonly isTablet = signal<boolean | undefined>(undefined);
  readonly isDesktop = signal<boolean | undefined>(undefined);

  constructor() {
    this.initializeBreakpointObservers();
  }

  private initializeBreakpointObservers(): void {
    const { Handset, Tablet } = Breakpoints;

    this.breakpointObserver
      .observe(Handset)
      .pipe(takeUntilDestroyed())
      .subscribe((result) => this.isMobile.set(result.matches));

    // Observer para tablets
    this.breakpointObserver
      .observe(Tablet)
      .pipe(takeUntilDestroyed())
      .subscribe((result) => this.isTablet.set(result.matches));

    // Observer para desktop/web
    this.breakpointObserver
      .observe(['(min-width: 1024px)'])
      .pipe(takeUntilDestroyed())
      .subscribe((result) => this.isDesktop.set(result.matches));
  }
}
