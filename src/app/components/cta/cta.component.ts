import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * The closing call to action, reused at the foot of every marketing page so a
 * visitor never has to scroll back up to find the next step.
 */
@Component({
  selector: 'app-cta',
  imports: [RouterLink],
  template: `
    <section class="bg-ink-950 text-white">
      <div class="max-w-4xl mx-auto px-6 py-20 md:py-24 text-center">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-5">
          {{ heading() }}
        </h2>
        <p class="text-ink-300 text-lg leading-relaxed max-w-2xl mx-auto mb-9">
          {{ body() }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/contact"
             class="px-7 py-3.5 bg-accent-500 text-ink-950 rounded-lg font-semibold hover:bg-accent-400 transition-colors">
            Book a modernization assessment
          </a>
          <a routerLink="/services"
             class="px-7 py-3.5 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/15">
            See how engagements work
          </a>
        </div>
      </div>
    </section>
  `,
})
export class CtaComponent {
  heading = input('Find out what your migration actually involves.');
  body = input(
    'The assessment is a fixed-fee, fixed-scope piece of work with a written plan at the end of it. No retainer, no commitment to the build, and you keep the plan either way.'
  );
}
