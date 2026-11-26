import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { RouteMeta } from '@analogjs/router';
import { CtaComponent } from '../components/cta/cta.component';
import { pageMeta } from '../seo';
import { apps, site, tagline } from '../site.config';

const title = `${site.name} · pitch-n, rep-n and quest-n`;

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
        <div class="max-w-3xl">
          <p class="inline-flex items-center gap-2 text-accent-300 font-medium mb-6 text-sm tracking-wide">
            <span class="w-8 h-px bg-accent-400"></span>
            {{ legalName }}
          </p>
          <h1 class="text-4xl md:text-[3.4rem] font-bold tracking-tightest leading-[1.08] mb-7">
            Apps for making plans
            <span class="text-accent-300">and sticking to goals.</span>
          </h1>
          <p class="text-lg md:text-xl text-ink-300 leading-relaxed max-w-2xl mb-9">
            Lyra makes pitch-n, rep-n and quest-n. It also builds and replaces
            business-critical .NET and Angular systems for other companies.
          </p>
          <div class="flex flex-wrap gap-4">
            <a routerLink="/" fragment="apps"
               class="px-7 py-3.5 bg-accent-500 text-ink-950 rounded-lg font-semibold hover:bg-accent-400 transition-colors">
              See the apps
            </a>
            <a routerLink="/services"
               class="px-7 py-3.5 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/15">
              Services for companies
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- The apps -->
    <section id="apps" class="scroll-mt-24 bg-ink-50 border-b border-ink-100">
      <div class="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div class="max-w-2xl mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight mb-5">
            The apps
          </h2>
          <p class="text-lg text-ink-600 leading-relaxed">
            Each one does a single job, and they share one Lyra sign-in.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          @for (app of apps; track app.id) {
            <article [id]="app.id"
                     class="scroll-mt-24 bg-white rounded-xl border border-ink-100 shadow-card p-7 flex flex-col">
              <div class="flex items-center justify-between gap-3 mb-4">
                <h3 class="text-2xl font-bold text-ink-900">{{ app.name }}</h3>
                <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border"
                      [class]="app.url ? 'bg-accent-50 text-accent-800 border-accent-100' : 'bg-ink-50 text-ink-600 border-ink-200'">
                  {{ app.status }}
                </span>
              </div>
              <p class="text-ink-900 font-medium leading-relaxed mb-3">{{ app.summary }}</p>
              <p class="text-ink-600 text-[15px] leading-relaxed mb-5">{{ app.body }}</p>
              <ul class="space-y-2.5 mb-7 text-[15px]">
                @for (point of app.points; track point) {
                  <li class="flex gap-2.5 text-ink-700">
                    <svg class="w-4 h-4 text-accent-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>{{ point }}</span>
                  </li>
                }
              </ul>
              @if (app.url) {
                <a [href]="app.url" target="_blank" rel="noopener"
                   class="mt-auto inline-flex items-center text-accent-700 font-semibold hover:text-accent-800 transition-colors text-[15px] group">
                  Open {{ app.name }}
                  <svg class="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              } @else {
                <p class="mt-auto text-ink-500 text-[15px]">{{ app.availability }}</p>
              }
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Services -->
    <section>
      <div class="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div class="max-w-2xl mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight mb-5">
            Services for companies
          </h2>
          <p class="text-lg text-ink-600 leading-relaxed">
            The same .NET and Angular stack the apps run on, applied to the inventory
            and construction build-out systems large operations depend on. The health
            check is the place to start.
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
              <p class="text-ink-600 text-[15px] leading-relaxed mb-7">{{ service.description }}</p>
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

    <app-cta />
  `,
})
export default class HomePageComponent {
  legalName = site.legalName;
  apps = apps;

  services = [
    {
      id: 'assessment',
      stage: 'Step one',
      title: 'Inventory Data Health Check',
      description:
        'A short, self-contained assessment of where the data drifts and what the legacy tool is costing. It ends in a written plan you keep.',
      linkLabel: 'What the health check covers',
    },
    {
      id: 'migration',
      stage: 'The main offer',
      title: 'Retire One Legacy Inventory Tool',
      description:
        'One aging tool, replaced. The new system runs side by side with the old one until an agreed switch-off date.',
      linkLabel: 'How a retirement runs',
    },
    {
      id: 'fractional',
      stage: 'For integrators',
      title: 'Embedded for Integrators',
      description:
        "Senior .NET and Angular depth on your team's inventory, ERP or field-system project, working remotely.",
      linkLabel: 'What this looks like',
    },
  ];
}
