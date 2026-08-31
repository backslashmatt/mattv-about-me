import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a href="#main"
       class="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:bg-ink-900 focus:text-white focus:rounded-lg">
      Skip to content
    </a>

    <header class="bg-white/85 backdrop-blur-md border-b border-ink-100 sticky top-0 z-50">
      <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6"
           aria-label="Primary">
        <a routerLink="/" class="font-display text-3xl text-ink-900 hover:text-accent-700 transition-colors leading-none">
          matt v
        </a>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-8">
          <ul class="flex items-center gap-8">
            @for (link of navLinks; track link.path) {
              <li>
                <a [routerLink]="link.path"
                   routerLinkActive="text-accent-700"
                   [routerLinkActiveOptions]="{ exact: link.exact }"
                   class="text-ink-600 hover:text-accent-700 transition-colors font-medium text-[15px]">
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
          <a routerLink="/contact"
             class="px-4 py-2 bg-ink-900 text-white rounded-lg font-medium text-[15px] hover:bg-accent-700 transition-colors">
            Book an assessment
          </a>
        </div>

        <!-- Mobile hamburger -->
        <button class="md:hidden p-2 -mr-2 text-ink-600 hover:text-accent-700 transition-colors"
                [attr.aria-expanded]="mobileMenuOpen()"
                aria-controls="mobile-menu"
                [attr.aria-label]="mobileMenuOpen() ? 'Close menu' : 'Open menu'"
                (click)="mobileMenuOpen.set(!mobileMenuOpen())">
          @if (mobileMenuOpen()) {
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          } @else {
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          }
        </button>
      </nav>

      <!-- Mobile menu -->
      @if (mobileMenuOpen()) {
        <div id="mobile-menu" class="md:hidden border-t border-ink-100 bg-white">
          <ul class="px-6 py-4 space-y-1">
            @for (link of navLinks; track link.path) {
              <li>
                <a [routerLink]="link.path"
                   routerLinkActive="text-accent-700"
                   [routerLinkActiveOptions]="{ exact: link.exact }"
                   (click)="mobileMenuOpen.set(false)"
                   class="block text-ink-600 hover:text-accent-700 transition-colors font-medium py-2">
                  {{ link.label }}
                </a>
              </li>
            }
            <li class="pt-2">
              <a routerLink="/contact"
                 (click)="mobileMenuOpen.set(false)"
                 class="block text-center px-4 py-2.5 bg-ink-900 text-white rounded-lg font-medium">
                Book an assessment
              </a>
            </li>
          </ul>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);

  navLinks = [
    { path: '/services', label: 'Services', exact: false },
    { path: '/about', label: 'About', exact: true },
    { path: '/blog', label: 'Writing', exact: false },
  ];
}
