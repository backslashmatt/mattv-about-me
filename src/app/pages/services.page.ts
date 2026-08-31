import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { RouteMeta } from '@analogjs/router';
import { CtaComponent } from '../components/cta/cta.component';
import { pageMeta, pageTitle } from '../seo';

const description =
  'Three ways to work with Matt Verry on legacy .NET and Angular systems: a fixed-fee modernization assessment, full migration and modernization delivery, and fractional technical leadership.';

export const routeMeta: RouteMeta = {
  title: pageTitle('Services'),
  meta: pageMeta({
    title: 'Services — Legacy .NET & Angular Modernization',
    description,
    path: '/services',
  }),
};

@Component({
  imports: [RouterLink, CtaComponent],
  template: `
    <!-- Page header -->
    <section class="bg-ink-950 text-white">
      <div class="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <p class="text-accent-300 font-medium mb-5 text-sm tracking-wide uppercase">Services</p>
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          Engagements sized to the decision in front of you
        </h1>
        <p class="text-lg md:text-xl text-ink-300 leading-relaxed max-w-2xl">
          You should not have to sign a six-figure delivery contract to find out whether
          a modernization is feasible. So the work is structured in stages, and the first
          one is small on purpose.
        </p>
      </div>
    </section>

    <!-- Engagements -->
    <div class="max-w-5xl mx-auto px-6 py-20 md:py-24 space-y-20 md:space-y-28">
      @for (engagement of engagements; track engagement.id; let i = $index) {
        <section [id]="engagement.id" class="scroll-mt-24">
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span class="px-3 py-1 rounded-full bg-accent-50 text-accent-800 text-xs font-bold uppercase tracking-wider border border-accent-100">
              {{ engagement.stage }}
            </span>
            <span class="text-ink-500 text-sm font-medium">{{ engagement.shape }}</span>
          </div>

          <h2 class="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight mb-5">
            {{ engagement.title }}
          </h2>
          <p class="text-lg text-ink-600 leading-relaxed max-w-3xl mb-10">
            {{ engagement.summary }}
          </p>

          <div class="grid md:grid-cols-2 gap-6 mb-10">
            <div class="bg-ink-50 rounded-xl border border-ink-100 p-7">
              <h3 class="text-sm font-bold text-ink-900 uppercase tracking-wide mb-5">
                {{ engagement.deliverablesLabel }}
              </h3>
              <ul class="space-y-3.5">
                @for (item of engagement.deliverables; track item) {
                  <li class="flex gap-3 text-ink-700 leading-relaxed">
                    <svg class="w-4 h-4 text-accent-600 flex-shrink-0 mt-1.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>{{ item }}</span>
                  </li>
                }
              </ul>
            </div>

            <div class="bg-white rounded-xl border border-ink-200 p-7">
              <h3 class="text-sm font-bold text-ink-900 uppercase tracking-wide mb-5">
                This is a fit if
              </h3>
              <ul class="space-y-3.5">
                @for (item of engagement.fitFor; track item) {
                  <li class="flex gap-3 text-ink-700 leading-relaxed">
                    <span class="w-1.5 h-1.5 rounded-full bg-ink-300 flex-shrink-0 mt-2.5"></span>
                    <span>{{ item }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>

          <div class="border-l-2 border-accent-500 pl-6 py-1">
            <p class="text-ink-700 leading-relaxed">
              <span class="font-semibold text-ink-900">How it starts:</span>
              {{ engagement.howItStarts }}
            </p>
          </div>
        </section>

        @if (i < engagements.length - 1) {
          <hr class="border-ink-100"/>
        }
      }
    </div>

    <!-- Stack -->
    <section class="bg-ink-50 border-y border-ink-100">
      <div class="max-w-5xl mx-auto px-6 py-20">
        <h2 class="text-2xl md:text-3xl font-bold text-ink-900 tracking-tight mb-3">
          The ground I cover
        </h2>
        <p class="text-ink-600 leading-relaxed mb-10 max-w-2xl">
          Deliberately narrow. This is the stack I have spent my career in, which is why
          I can give you a straight answer about it.
        </p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (group of stack; track group.area) {
            <div>
              <h3 class="text-sm font-bold text-ink-900 uppercase tracking-wide mb-4">{{ group.area }}</h3>
              <ul class="space-y-2">
                @for (item of group.items; track item) {
                  <li class="text-ink-600 text-[15px]">{{ item }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Honest boundaries -->
    <section class="max-w-5xl mx-auto px-6 py-20">
      <div class="max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold text-ink-900 tracking-tight mb-6">
          What I am not the right call for
        </h2>
        <div class="space-y-4 text-lg text-ink-600 leading-relaxed">
          <p>
            Greenfield products on a stack I don't work in. Mobile apps. Data science
            and ML platforms. Design-led marketing builds. Anything where you need a
            team of ten starting Monday.
          </p>
          <p>
            If that's what you're after, say so in your first email and I'll tell you
            straight away rather than after two calls. Where I can, I'll point you at
            someone better suited.
          </p>
        </div>
        <a routerLink="/about"
           class="inline-flex items-center mt-8 text-accent-700 font-semibold hover:text-accent-800 transition-colors group">
          More about how I got here
          <svg class="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>

    <app-cta />
  `,
})
export default class ServicesPageComponent {
  engagements = [
    {
      id: 'assessment',
      stage: 'Step one',
      shape: 'Fixed fee, fixed scope',
      title: 'Modernization Assessment',
      summary:
        "Before anyone commits to a migration budget, it is worth knowing what the migration actually is. The assessment is a short, self-contained engagement that produces a written plan — and the plan is yours regardless of what you do next.",
      deliverablesLabel: 'What you get',
      deliverables: [
        'A complete inventory of frameworks, packages, and runtimes, with end-of-life dates',
        'Risks ranked by business exposure — what actually threatens the operation, not a raw vulnerability dump',
        'A staged migration plan, sequenced so each stage ships on its own',
        'Effort estimates per stage, honest about what is uncertain and why',
        'Quick wins your team can pick up immediately, without waiting on me',
        'A walkthrough call with your engineers and whoever holds the budget',
      ],
      fitFor: [
        'You know the system is behind but cannot yet defend a number to your board',
        'You have been quoted for a rewrite and want a second opinion on whether that is really necessary',
        'An audit, insurer, or customer has raised your framework versions in writing',
        'You are deciding between modernizing and replacing, and need the real comparison',
      ],
      howItStarts:
        'An email describing what you run and what is forcing the change. If it looks like a fit, we spend half an hour on a call, then I send a scope and a fixed price before any money changes hands.',
    },
    {
      id: 'migration',
      stage: 'The main event',
      shape: 'Project-based, staged delivery',
      title: 'Migration & Modernization',
      summary:
        'The build itself. Framework upgrades, re-platforming, and the deployment machinery to support them — delivered incrementally against the live system, so the application keeps shipping the whole way through.',
      deliverablesLabel: 'Typical scope',
      deliverables: [
        'AngularJS and out-of-support Angular versions brought to current Angular',
        '.NET Framework applications moved to modern .NET',
        'On-premise workloads re-platformed to Azure, with infrastructure as code',
        'CI/CD pipelines replacing manual deploys, with a rollback that has been tested',
        'A test suite where there was not one, focused on what would actually hurt if it broke',
        'Documentation and handover written for the team who will maintain it',
      ],
      fitFor: [
        'The application is business-critical and cannot go dark for a rewrite',
        'You need feature work to continue during the migration, not after it',
        'Both the front end and the back end need to move, and moving them separately has already been tried',
        'You want the team to come out of it able to maintain what they are handed',
      ],
      howItStarts:
        'Usually straight out of an assessment, because by then the scope is known and estimated. If you already have a plan you trust, I am happy to work to yours instead.',
    },
    {
      id: 'fractional',
      stage: 'Ongoing',
      shape: 'Retained, part-time',
      title: 'Fractional Technical Lead',
      summary:
        'Senior technical depth for a team that needs it but cannot justify another full-time hire — either alongside a migration, or afterwards to make sure the system does not drift straight back.',
      deliverablesLabel: 'What the role covers',
      deliverables: [
        'Architecture decisions and technical direction, written down and defensible',
        'Code review with standards your team keeps using once I am gone',
        'Mentoring your developers on the modern stack, deliberately and continuously',
        'Upgrade cadence, so framework versions never fall this far behind again',
        'A known quantity to call when something breaks at an inconvenient hour',
      ],
      fitFor: [
        'A capable team that is missing seniority in this specific stack',
        'You just finished a migration and want the discipline to stick',
        'A technical lead left and you need cover while you hire properly',
        'You want the option of continuity without a permanent headcount',
      ],
      howItStarts:
        'A conversation about what the team has, what it is missing, and how many days a month would close that gap. Arrangements are month to month — if it stops being worth it, it should be easy to stop.',
    },
  ];

  stack = [
    {
      area: 'Front end',
      items: ['Angular (current)', 'AngularJS migration', 'TypeScript', 'RxJS & signals', 'Tailwind CSS'],
    },
    {
      area: 'Back end',
      items: ['C# / modern .NET', '.NET Framework', 'REST APIs', 'SQL Server', 'Entity Framework'],
    },
    {
      area: 'Platform',
      items: ['Azure', 'Infrastructure as code', 'Docker', 'CI/CD pipelines', 'Automated deploys'],
    },
    {
      area: 'Practice',
      items: ['Incremental migration', 'Automated testing', 'Code review', 'Technical documentation', 'Team mentoring'],
    },
  ];
}
