import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { RouteMeta } from '@analogjs/router';
import { CtaComponent } from '../components/cta/cta.component';
import { pageMeta } from '../seo';
import { tagline } from '../site.config';

export const routeMeta: RouteMeta = {
  title: 'Matt Verry — Legacy .NET & Angular Modernization',
  meta: pageMeta({
    title: 'Matt Verry — Legacy .NET & Angular Modernization',
    description: tagline,
    path: '/',
  }),
};

@Component({
  imports: [RouterLink, CtaComponent],
  template: `
    <!-- Hero -->
    <section class="relative overflow-hidden bg-ink-950 text-white">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,160,143,0.22),transparent_60%)]"></div>
      <div class="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div class="grid md:grid-cols-[1.4fr_1fr] items-center gap-14">
          <div>
            <p class="inline-flex items-center gap-2 text-accent-300 font-medium mb-6 text-sm tracking-wide">
              <span class="w-8 h-px bg-accent-400"></span>
              Independent consultant &middot; .NET &amp; Angular
            </p>
            <h1 class="text-4xl md:text-[3.4rem] font-bold tracking-tightest leading-[1.08] mb-7">
              Your business runs on software that is
              <span class="text-accent-300">aging out from under you.</span>
            </h1>
            <p class="text-lg md:text-xl text-ink-300 leading-relaxed max-w-xl mb-9">
              I'm Matt Verry. I modernize the legacy .NET and Angular applications
              companies actually depend on &mdash; incrementally, in production, without
              pausing the roadmap or betting the business on a rewrite.
            </p>
            <div class="flex flex-wrap gap-4">
              <a routerLink="/contact"
                 class="px-7 py-3.5 bg-accent-500 text-ink-950 rounded-lg font-semibold hover:bg-accent-400 transition-colors">
                Book a modernization assessment
              </a>
              <a routerLink="/services"
                 class="px-7 py-3.5 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/15">
                How engagements work
              </a>
            </div>
          </div>

          <div class="hidden md:block justify-self-end">
            <img src="assets/MattV.jpg"
                 alt="Matt Verry"
                 width="320" height="376"
                 class="rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10"/>
          </div>
        </div>
      </div>
    </section>

    <!-- Symptoms: let the visitor recognise themselves -->
    <section class="bg-ink-50 border-b border-ink-100">
      <div class="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div class="max-w-2xl mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight mb-5">
            Any of this sound familiar?
          </h2>
          <p class="text-lg text-ink-600 leading-relaxed">
            These are the conversations that start most engagements. If more than one
            of them is true, the clock is already running.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          @for (symptom of symptoms; track symptom.title) {
            <div class="bg-white rounded-xl p-6 border border-ink-100 shadow-card">
              <h3 class="text-base font-semibold text-ink-900 mb-2.5 leading-snug">
                {{ symptom.title }}
              </h3>
              <p class="text-ink-600 text-[15px] leading-relaxed">{{ symptom.body }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Positioning -->
    <section class="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div class="grid md:grid-cols-[1fr_1.1fr] gap-14 items-start">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight leading-tight">
            The problem usually isn't the code.<br/>
            <span class="text-accent-700">It's the clock.</span>
          </h2>
        </div>
        <div class="space-y-5 text-lg text-ink-600 leading-relaxed">
          <p>
            The application works. It has worked for years. That is exactly why nobody
            has touched it &mdash; and why the frameworks underneath it quietly went
            end-of-life while everyone was busy shipping features.
          </p>
          <p>
            Now the deadline belongs to somebody else. A security audit, an insurer, a
            cloud migration mandate, a framework that stopped getting patches, or the
            last engineer who understood it handing in their notice.
          </p>
          <p class="text-ink-900 font-medium">
            That is the work I do, and close to all I do: taking systems that are
            business-critical and behind, and bringing them current without a
            big-bang rewrite and without a feature freeze.
          </p>
        </div>
      </div>
    </section>

    <!-- Service ladder -->
    <section class="bg-ink-50 border-y border-ink-100">
      <div class="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div class="max-w-2xl mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight mb-5">
            Three ways to work together
          </h2>
          <p class="text-lg text-ink-600 leading-relaxed">
            Most clients start with an assessment. It is deliberately small, so you can
            find out whether I'm right for the job before committing to the job.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          @for (service of services; track service.title; let i = $index) {
            <div class="bg-white rounded-xl border border-ink-100 shadow-card p-7 flex flex-col"
                 [class]="i === 0 ? 'ring-2 ring-accent-500 relative' : ''">
              @if (i === 0) {
                <span class="absolute -top-3 left-7 px-3 py-1 bg-accent-500 text-ink-950 text-xs font-bold uppercase tracking-wide rounded-full">
                  Start here
                </span>
              }
              <p class="text-accent-700 font-semibold text-xs uppercase tracking-wider mb-3">
                {{ service.stage }}
              </p>
              <h3 class="text-xl font-bold text-ink-900 mb-3">{{ service.title }}</h3>
              <p class="text-ink-600 text-[15px] leading-relaxed mb-5">{{ service.description }}</p>
              <ul class="space-y-2.5 mb-7 text-[15px]">
                @for (point of service.points; track point) {
                  <li class="flex gap-2.5 text-ink-700">
                    <svg class="w-4 h-4 text-accent-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>{{ point }}</span>
                  </li>
                }
              </ul>
              <a routerLink="/services"
                 class="mt-auto inline-flex items-center text-accent-700 font-semibold hover:text-accent-800 transition-colors text-[15px] group">
                {{ service.linkLabel }}
                <svg class="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Principles -->
    <section class="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div class="max-w-2xl mb-14">
        <h2 class="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight mb-5">
          How I work
        </h2>
        <p class="text-lg text-ink-600 leading-relaxed">
          Modernization projects fail in predictable ways. These are the commitments
          that keep this one out of that category.
        </p>
      </div>
      <div class="grid sm:grid-cols-2 gap-x-12 gap-y-10">
        @for (principle of principles; track principle.title; let i = $index) {
          <div class="flex gap-5">
            <span class="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-50 text-accent-700 font-bold flex items-center justify-center text-sm border border-accent-100">
              {{ i + 1 }}
            </span>
            <div>
              <h3 class="text-lg font-bold text-ink-900 mb-2">{{ principle.title }}</h3>
              <p class="text-ink-600 leading-relaxed">{{ principle.body }}</p>
            </div>
          </div>
        }
      </div>
    </section>

    <app-cta />
  `,
})
export default class HomePageComponent {
  symptoms = [
    {
      title: 'You are on AngularJS, or an Angular version years past end-of-life',
      body: 'No security patches, no supported upgrade path from where you are, and every new dependency fights the old ones.',
    },
    {
      title: '.NET Framework 4.8 is as far as you go',
      body: 'There is no 4.9. There never will be. Everything new in the ecosystem now assumes modern .NET, and you are locked out of it.',
    },
    {
      title: 'Hiring for it has become impossible',
      body: 'The stack is unattractive enough that candidates pass, and the people who know the system are the ones you can least afford to lose.',
    },
    {
      title: 'Release day is an event',
      body: 'Manual deploys, a runbook someone keeps in their head, and a rollback plan that has never actually been tested.',
    },
    {
      title: 'Somebody external is now asking questions',
      body: 'A security audit, a SOC 2 review, an insurer, or a customer questionnaire has flagged your framework versions in writing.',
    },
    {
      title: 'You have been told to get off the servers',
      body: 'A cloud migration mandate landed, and the application was never built with any of that in mind.',
    },
  ];

  services = [
    {
      stage: 'Step one',
      title: 'Modernization Assessment',
      description:
        'A short, fixed-fee engagement that ends in a written plan you own, whether or not you hire me to carry it out.',
      points: [
        'Full inventory of frameworks, dependencies, and end-of-life dates',
        'Risks ranked by real business exposure, not CVE count',
        'A staged migration plan with effort estimates',
        'Quick wins you can act on immediately',
      ],
      linkLabel: 'What the assessment covers',
    },
    {
      stage: 'The main event',
      title: 'Migration & Modernization',
      description:
        'The build. Framework upgrades, re-platforming, and the deployment pipeline to support them — shipped incrementally.',
      points: [
        'AngularJS and legacy Angular to current Angular',
        '.NET Framework to modern .NET',
        'On-premise to Azure, with infrastructure as code',
        'CI/CD, automated tests, and repeatable deploys',
      ],
      linkLabel: 'How migrations run',
    },
    {
      stage: 'Ongoing',
      title: 'Fractional Technical Lead',
      description:
        'Senior depth for a team that needs it part-time — during the migration, or to hold the line after it.',
      points: [
        'Architecture and technical direction',
        'Code review and standards your team keeps using',
        'Mentoring, so the knowledge stays in-house',
        'A known quantity on call when something breaks',
      ],
      linkLabel: 'What this looks like',
    },
  ];

  principles = [
    {
      title: 'The application ships the entire time',
      body: 'Migrations run incrementally against the running system, old and new side by side. There is no months-long freeze, and no date where everything changes at once and you hope.',
    },
    {
      title: 'Your team ends up owning it',
      body: 'I write the documentation and work alongside your developers deliberately. The goal is a system your team can maintain without me — not a dependency on me.',
    },
    {
      title: 'Both halves of the stack, one person',
      body: 'Upgrading Angular and .NET together is where these projects usually stall, because the contract front-end and the contract back-end are pointing at each other. I hold both sides.',
    },
    {
      title: 'The risky part goes first',
      body: 'The assessment exists so the expensive decisions get made with real information. You find out what you are in for before you commit the budget, not halfway through it.',
    },
  ];
}
