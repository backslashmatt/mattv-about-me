import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { RouteMeta } from '@analogjs/router';
import { CtaComponent } from '../components/cta/cta.component';
import { pageMeta } from '../seo';
import { placeholders, site, tagline } from '../site.config';

const title = `${site.name} · Inventory and build-out systems`;

export const routeMeta: RouteMeta = {
  title,
  meta: pageMeta({
    title,
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
              Lyra &middot; Inventory &amp; construction build-out systems
            </p>
            <h1 class="text-4xl md:text-[3.4rem] font-bold tracking-tightest leading-[1.08] mb-7">
              Inventory and build-out software
              <span class="text-accent-300">that your crews actually use.</span>
            </h1>
            <p class="text-lg md:text-xl text-ink-300 leading-relaxed max-w-xl mb-9">
              I'm Matt Verry, and Lyra is my independent practice in Arizona. I fix and
              replace the inventory and construction build-out systems large operations
              depend on, usually at a fixed price with a clear finish line.
            </p>
            <div class="flex flex-wrap gap-4">
              <a routerLink="/contact"
                 class="px-7 py-3.5 bg-accent-500 text-ink-950 rounded-lg font-semibold hover:bg-accent-400 transition-colors">
                Book a 20-minute call
              </a>
              <a routerLink="/services" fragment="migration"
                 class="px-7 py-3.5 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/15">
                See the fixed-scope offer
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
            If more than one of these is true of the system you run, the clock is
            already running.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 gap-5">
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
            The problem usually isn't the inventory tool.<br/>
            <span class="text-accent-700">It's the clock.</span>
          </h2>
        </div>
        <div class="space-y-5 text-lg text-ink-600 leading-relaxed">
          <p>
            The tool works. It has worked for years. That is exactly why nobody has
            touched it, and why the framework underneath it quietly went out of support
            while everyone was busy running the business.
          </p>
          <p>
            Now the deadline belongs to somebody else: an audit, an ERP upgrade, a new
            site coming online, or the last person who understood the tool handing in
            their notice.
          </p>
          <p class="text-ink-900 font-medium">
            I've spent {{ years }} years building and rescuing these systems for large
            enterprises. I replace the one tool everyone depends on, side by side with
            the old one, with a date it gets switched off.
          </p>
        </div>
      </div>
    </section>

    <!-- What I work on -->
    <section class="bg-ink-50 border-y border-ink-100">
      <div class="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div class="max-w-2xl mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight mb-5">
            What I work on
          </h2>
          <p class="text-lg text-ink-600 leading-relaxed">
            Most of my work has been large-scale inventory management and construction
            build-out for large enterprises.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-6 mb-10">
          @for (area of areas; track area.title) {
            <div class="bg-white rounded-xl p-6 border border-ink-100 shadow-card">
              <h3 class="text-lg font-bold text-ink-900 mb-2.5">{{ area.title }}</h3>
              <p class="text-ink-600 text-[15px] leading-relaxed">{{ area.body }}</p>
            </div>
          }
        </div>
        <p class="border-l-2 border-accent-500 pl-6 py-1 text-ink-700 leading-relaxed max-w-3xl">
          <span class="font-semibold text-ink-900">Example:</span>
          {{ exampleResult }}
        </p>
      </div>
    </section>

    <!-- Service ladder -->
    <section>
      <div class="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div class="max-w-2xl mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight mb-5">
            Three ways to work together
          </h2>
          <p class="text-lg text-ink-600 leading-relaxed">
            The health check is the place to start. It is deliberately small, so you
            can find out whether I'm right for the job before committing to the job.
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
              <a routerLink="/services" [fragment]="service.id"
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
    <section class="bg-ink-50 border-t border-ink-100">
      <div class="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div class="max-w-2xl mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight mb-5">
            How I work
          </h2>
          <p class="text-lg text-ink-600 leading-relaxed">
            Replacement projects fail in predictable ways. These are the commitments
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
      </div>
    </section>

    <app-cta />
  `,
})
export default class HomePageComponent {
  years = placeholders.years;
  exampleResult = placeholders.exampleResult;

  symptoms = [
    {
      title: 'Counts drift between systems',
      body: 'The warehouse, the ERP and the field app each have a number for the same item, and nobody trusts any of them without a recount.',
    },
    {
      title: 'Crews re-key the same data',
      body: 'Orders, materials and progress get typed into two or three systems by hand, and every copy is another chance to get it wrong.',
    },
    {
      title: 'The one tool nobody wants to touch',
      body: 'Everything depends on it, it was built years ago, and the person who understood it has moved on or is about to.',
    },
    {
      title: 'It runs on .NET Framework or an old Angular',
      body: 'The stack underneath stopped getting patches, so every change is slow, hiring for it is hard, and every audit flags it.',
    },
  ];

  areas = [
    {
      title: 'Inventory at scale',
      body: 'Stock, locations and counts across warehouses and sites, kept in step with the ERP so the numbers agree.',
    },
    {
      title: 'Construction build-out',
      body: 'Materials, crews and progress on large build-outs, from what was planned to what is actually installed on site.',
    },
    {
      title: 'Legacy replacement',
      body: 'The aging .NET or Angular tool everything depends on, replaced piece by piece while it keeps running.',
    },
  ];

  services = [
    {
      id: 'assessment',
      stage: 'Step one',
      title: 'Inventory Data Health Check',
      description:
        'One week, fixed fee. It ends in a written plan you own, whether or not you hire me to carry it out.',
      points: [
        'Where counts drift, and why, system by system',
        'Every place data gets re-keyed by hand',
        "The legacy tool's risks, ranked by business exposure",
        'A fixed quote to retire it, if that is the right call',
      ],
      linkLabel: 'What the health check covers',
    },
    {
      id: 'migration',
      stage: 'The main offer',
      title: 'Retire One Legacy Inventory Tool',
      description: `${placeholders.retireWeeks} weeks at a fixed price. The new system runs side by side with the old one until an agreed switch-off date.`,
      points: [
        'A one-week assessment to lock the scope',
        'Build and migrate side by side, with no freeze',
        'Switch-off on a date agreed up front',
        'Often small enough to approve without a procurement cycle',
      ],
      linkLabel: 'How a retirement runs',
    },
    {
      id: 'fractional',
      stage: 'For integrators',
      title: 'Embedded for Integrators',
      description: `Senior .NET and Angular depth on your team's project, remote from Arizona, ${placeholders.embeddedHours} hours a week.`,
      points: [
        'C#, ASP.NET Core and EF Core',
        'Angular front ends that crews actually use',
        'Integration between inventory, ERP and field systems',
        'Azure, PostgreSQL and CI/CD',
      ],
      linkLabel: 'What this looks like',
    },
  ];

  principles = [
    {
      title: 'The old tool keeps running the entire time',
      body: 'The new system runs side by side with the old one against real data. There is no months-long freeze, and no date where everything changes at once and you hope.',
    },
    {
      title: 'There is a finish line',
      body: 'Fixed scope, fixed price and a switch-off date agreed before the work starts. You know what done looks like, and when.',
    },
    {
      title: 'Your team ends up owning it',
      body: 'I write the documentation and work alongside your people deliberately. The goal is a system your team can run without me, not a dependency on me.',
    },
    {
      title: 'The risky part goes first',
      body: 'The health check exists so the expensive decisions get made with real information. You find out what you are in for before you commit the budget, not halfway through it.',
    },
  ];
}
