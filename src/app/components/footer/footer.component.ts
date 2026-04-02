import { Component } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialLinksComponent],
  template: `
    <footer class="border-t border-gray-200 bg-white">
      <div class="max-w-5xl mx-auto px-6 py-12 text-center">
        <p class="font-display text-3xl text-gray-900 mb-4">matt v</p>
        <app-social-links />
        <p class="text-gray-500 text-sm mt-6">
          &copy; {{ currentYear }} Matt Verry. Built with
          <a href="https://analogjs.org" target="_blank" rel="noopener"
             class="text-teal-600 hover:underline">Analog</a>
          &amp; Angular.
          <a href="https://github.com/backslashmatt/mattv-about-me/" target="_blank" rel="noopener"
             class="text-teal-600 hover:underline">View source</a>.
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
