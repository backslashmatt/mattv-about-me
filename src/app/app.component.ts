import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CanonicalLinkService } from './canonical-link.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-white text-ink-800">
      <app-header />
      <main id="main" tabindex="-1" class="flex-1 focus:outline-none">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppComponent {
  constructor() {
    inject(CanonicalLinkService).init();
    // Keep anchor targets clear of the sticky header (matches scroll-mt-24).
    inject(ViewportScroller).setOffset([0, 96]);
  }
}
