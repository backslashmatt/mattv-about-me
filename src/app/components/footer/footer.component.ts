import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { site } from '../../site.config';

@Component({
  selector: 'app-footer',
  imports: [SocialLinksComponent, RouterLink],
  template: `
    <footer class="bg-ink-950 text-ink-300 border-t border-white/5">
      <div class="max-w-6xl mx-auto px-6 py-14">
        <div class="grid gap-10 md:grid-cols-3">
          <!-- Identity -->
          <div class="md:col-span-1">
            <p class="font-display text-3xl text-white mb-3">matt v</p>
            <p class="text-sm leading-relaxed text-ink-400 max-w-xs">
              Independent consultant. I modernize the legacy .NET and Angular
              applications businesses still run on.
            </p>
          </div>

          <!-- Navigation -->
          <div class="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h2 class="text-white font-semibold text-sm uppercase tracking-wide mb-4">Site</h2>
              <ul class="space-y-2.5 text-sm">
                @for (link of siteLinks; track link.path) {
                  <li>
                    <a [routerLink]="link.path" class="hover:text-accent-300 transition-colors">
                      {{ link.label }}
                    </a>
                  </li>
                }
              </ul>
            </div>
            <div>
              <h2 class="text-white font-semibold text-sm uppercase tracking-wide mb-4">Start a conversation</h2>
              <p class="text-sm mb-4 leading-relaxed">
                Tell me what you're running and what's forcing the change.
              </p>
              <a [href]="'mailto:' + email"
                 class="text-accent-300 hover:text-accent-200 transition-colors text-sm font-medium break-all">
                {{ email }}
              </a>
              <div class="mt-6 flex">
                <app-social-links tone="dark" align="start" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-ink-400">
          <p>&copy; {{ currentYear }} Matt Verry. All rights reserved.</p>
          <p>
            Built with
            <a href="https://analogjs.org" target="_blank" rel="noopener"
               class="text-ink-300 hover:text-accent-300 underline underline-offset-2">Analog</a>
            &amp; Angular.
            <a href="https://github.com/backslashmatt/mattv-about-me/" target="_blank" rel="noopener"
               class="text-ink-300 hover:text-accent-300 underline underline-offset-2">View source</a>.
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  email = site.email;

  siteLinks = [
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Writing' },
    { path: '/contact', label: 'Contact' },
  ];
}
