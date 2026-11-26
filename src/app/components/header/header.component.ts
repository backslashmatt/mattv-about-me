import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <nav class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a routerLink="/" class="font-display text-3xl text-gray-900 hover:text-teal-600 transition-colors">
          matt v
        </a>

        <!-- Desktop nav -->
        <ul class="hidden md:flex items-center gap-8">
          @for (link of navLinks; track link.path) {
            <li>
              <a [routerLink]="link.path"
                 routerLinkActive="text-teal-600"
                 [routerLinkActiveOptions]="{ exact: link.exact }"
                 class="text-gray-600 hover:text-teal-600 transition-colors font-medium">
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <!-- Mobile hamburger -->
        <button class="md:hidden p-2 text-gray-600 hover:text-teal-600 transition-colors"
                (click)="mobileMenuOpen.set(!mobileMenuOpen())">
          @if (mobileMenuOpen()) {
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          } @else {
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          }
        </button>
      </nav>

      <!-- Mobile menu -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden border-t border-gray-100 bg-white">
          <ul class="px-6 py-4 space-y-3">
            @for (link of navLinks; track link.path) {
              <li>
                <a [routerLink]="link.path"
                   routerLinkActive="text-teal-600"
                   [routerLinkActiveOptions]="{ exact: link.exact }"
                   (click)="mobileMenuOpen.set(false)"
                   class="block text-gray-600 hover:text-teal-600 transition-colors font-medium py-1">
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);

  navLinks = [
    { path: '/about', label: 'About', exact: true },
    { path: '/blog', label: 'Blog', exact: false },
  ];
}
