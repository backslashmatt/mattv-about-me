import { Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';
import { CtaComponent } from '../components/cta/cta.component';
import { pageMeta, pageTitle } from '../seo';
import { site } from '../site.config';

const description =
  'Three ways to work with Lyra on inventory and construction build-out systems: an inventory data health check, retiring one legacy inventory tool, and senior .NET and Angular help embedded with integrators.';

export const routeMeta: RouteMeta = {
  title: pageTitle('Services'),
  meta: pageMeta({
    title: `Services · ${site.name}`,
    description,
    path: '/services',
  }),
};

@Component({
  imports: [CtaComponent],
  template: `
    <!-- Page header -->
    <section class="bg-ink-950 text-white">
      <div class="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <p class="text-accent-300 font-medium mb-5 text-sm tracking-wide uppercase">Services</p>
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          How Lyra can help
        </h1>
        <p class="text-lg md:text-xl text-ink-300 leading-relaxed max-w-2xl">
          You should not have to commit to a full rewrite to find out whether an aging
          inventory tool can be retired. So the work comes in stages, and the first one
          is small on purpose.
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
          The ground Lyra covers
        </h2>
        <p class="text-ink-600 leading-relaxed mb-10 max-w-2xl">
          Deliberately narrow. It is the same stack Lyra's own apps are built on, which
          is why you get a straight answer about it.
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
          When Lyra is not the right call
        </h2>
        <div class="space-y-4 text-lg text-ink-600 leading-relaxed">
          <p>
            Greenfield products on a stack Lyra does not work in. Native mobile apps. Data
            science and ML platforms. Design-led marketing builds. Anything where you
            need a team of ten starting Monday.
          </p>
          <p>
            If that's what you're after, say so in your first email and you'll hear so
            straight away rather than after two calls, with a pointer to someone better
            suited where there is one.
          </p>
        </div>
      </div>
    </section>

    <app-cta
      heading="Find out what retiring that tool actually involves."
      body="The health check ends in a written plan for what to do about it. There is no commitment to the build, and you keep the plan either way."
      secondaryLabel="See how a retirement works"
      secondaryLink="/services"
      secondaryFragment="migration" />
  `,
})
export default class ServicesPageComponent {
  engagements = [
    {
      id: 'assessment',
      stage: 'Step one',
      shape: 'Ends in a written plan you keep',
      title: 'Inventory Data Health Check',
      summary:
        'Before anyone commits budget to replacing a system, it is worth knowing what the replacement actually involves. The health check is a short, self-contained assessment that ends in a written plan, and the plan is yours whatever you do next.',
      deliverablesLabel: 'What you get',
      deliverables: [
        'A map of every system that holds inventory or build-out data, and how they talk to each other',
        'Where counts drift between systems, and the cause of each gap',
        'Every place data gets re-keyed by hand, with the hours it costs',
        "The legacy tool's risks, ranked by business exposure rather than a raw vulnerability list",
        'A plan and a switch-off date for retiring it, if that is the right call',
        'A walkthrough with your team and whoever holds the budget',
      ],
      fitFor: [
        'Nobody trusts the counts without a recount',
        'You know the tool is behind but cannot yet defend a number to the people who approve budget',
        'You have been quoted for a full rewrite and want a second opinion',
        'An audit, an ERP upgrade or a new site is forcing the question',
      ],
      howItStarts:
        'A call about what you run and what is forcing the change. If it looks like a fit, Lyra sends a written scope before anything is agreed.',
    },
    {
      id: 'migration',
      stage: 'The main offer',
      shape: 'Old and new run side by side',
      title: 'Retire One Legacy Inventory Tool',
      summary:
        'One aging tool, replaced and switched off. The new system runs side by side with the old one until an agreed date, so the operation never stops.',
      deliverablesLabel: 'How it runs',
      deliverables: [
        'An assessment that locks the scope and the switch-off date',
        'The replacement built on modern .NET and Angular, in your cloud and your repository',
        'Data migrated and reconciled against the old tool, so the counts agree before anyone switches',
        'Both systems side by side, with crews moving over in stages rather than all at once',
        'The old tool switched off on the agreed date',
        'Documentation and handover written for the people who will run it',
      ],
      fitFor: [
        'One tool sits at the centre of the operation and cannot go dark for a rewrite',
        'You want a clear finish line, not an open-ended project',
        'The front end and the back end both need to move',
        'You want your team to come out of it able to run what they are handed',
      ],
      howItStarts:
        'Usually straight out of a health check, because by then the scope is known. If you already have a plan you trust, Lyra can work to yours instead.',
    },
    {
      id: 'fractional',
      stage: 'For integrators',
      shape: 'Working remotely',
      title: 'Embedded for Integrators',
      summary:
        "Senior .NET and Angular depth on your team's project, for integrators and consultancies delivering inventory, ERP or field systems who need someone who has built these before.",
      deliverablesLabel: 'What Lyra brings',
      deliverables: [
        'C#, ASP.NET Core and EF Core on the back end',
        'Angular front ends that crews actually use in the field',
        'Integration between inventory, ERP and field systems',
        'Azure, PostgreSQL and CI/CD pipelines with tested rollbacks',
        'Code review and documentation your team keeps using after the engagement ends',
      ],
      fitFor: [
        'You have won an inventory or build-out project and need senior hands on it',
        'Your team is strong but missing depth in this stack or this domain',
        'You need someone who can talk to the client\'s operations people as well as write the code',
        'You want a known quantity without a permanent headcount',
      ],
      howItStarts:
        'A call about the project, what your team has and what it is missing.',
    },
  ];

  stack = [
    {
      area: 'Domain',
      items: ['Inventory management', 'Construction build-out', 'Legacy replacement', 'Data reconciliation'],
    },
    {
      area: 'Back end',
      items: ['C# / modern .NET', 'ASP.NET Core', 'Entity Framework Core', '.NET Framework', 'REST APIs'],
    },
    {
      area: 'Front end & data',
      items: ['Angular (current)', 'AngularJS migration', 'TypeScript', 'PostgreSQL', 'SQL Server'],
    },
    {
      area: 'Platform',
      items: ['Azure', 'Infrastructure as code', 'Docker', 'CI/CD pipelines', 'Automated tests'],
    },
  ];
}
