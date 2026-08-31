import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { RouteMeta } from '@analogjs/router';
import { SocialLinksComponent } from '../components/social-links/social-links.component';
import { CtaComponent } from '../components/cta/cta.component';
import { pageMeta, pageTitle } from '../seo';

const description =
  'Matt Verry is an independent consultant who modernizes legacy .NET and Angular applications. How he works, who he works with, and what to expect from an engagement.';

export const routeMeta: RouteMeta = {
  title: pageTitle('About'),
  meta: pageMeta({
    title: 'About Matt Verry',
    description,
    path: '/about',
    type: 'article',
  }),
};

@Component({
  imports: [SocialLinksComponent, CtaComponent, RouterLink],
  template: `
    <div class="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <div class="grid md:grid-cols-[280px_1fr] gap-12 md:gap-16 items-start">
        <!-- Photo + social -->
        <div class="flex flex-col items-center md:items-start md:sticky md:top-28">
          <img src="assets/MattV.jpg"
               alt="Matt Verry"
               width="280" height="330"
               class="rounded-2xl shadow-lift border border-ink-100 mb-6"/>
          <app-social-links align="start" />
          <p class="text-sm text-ink-500 mt-5 leading-relaxed text-center md:text-left">
            Working through
            <span class="text-ink-700 font-medium">Lyra Apps</span>,
            my consultancy.
          </p>
        </div>

        <!-- Bio -->
        <div>
          <h1 class="text-4xl md:text-5xl font-bold text-ink-900 tracking-tight mb-3">
            About Matt
          </h1>
          <p class="text-lg text-accent-700 font-medium mb-8">
            Independent consultant, legacy .NET &amp; Angular modernization
          </p>

          <div class="space-y-6 text-lg text-ink-600 leading-relaxed">
            <p>
              I have spent my career as a full stack .NET developer working in Angular
              &mdash; building the line-of-business applications that companies run on,
              and then, increasingly, being the person called in when those applications
              had fallen years behind.
            </p>
            <p>
              That second part turned out to be the more useful skill. Plenty of
              developers can start something new. Far fewer are willing to open a
              ten-year-old codebase that nobody has documented, work out what it
              actually does, and move it forward without breaking the business that
              depends on it running Monday morning.
            </p>
            <p>
              So that is what I do now, deliberately and more or less exclusively.
              Legacy .NET and Angular systems, brought current, in production,
              incrementally.
            </p>
          </div>

          <!-- Why it works -->
          <div class="mt-14">
            <h2 class="text-2xl font-bold text-ink-900 tracking-tight mb-8">
              Why hire one person for this
            </h2>
            <div class="space-y-8">
              @for (reason of reasons; track reason.title) {
                <div class="border-l-2 border-ink-100 pl-6">
                  <h3 class="text-lg font-bold text-ink-900 mb-2">{{ reason.title }}</h3>
                  <p class="text-ink-600 leading-relaxed">{{ reason.body }}</p>
                </div>
              }
            </div>
          </div>

          <!-- Working style -->
          <div class="mt-14">
            <h2 class="text-2xl font-bold text-ink-900 tracking-tight mb-6">
              What working together is like
            </h2>
            <ul class="space-y-4">
              @for (item of workingStyle; track item) {
                <li class="flex gap-3.5 text-ink-600 leading-relaxed">
                  <svg class="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2.25" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>{{ item }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- Stack -->
          <div class="mt-14">
            <h2 class="text-2xl font-bold text-ink-900 tracking-tight mb-6">
              What I work with
            </h2>
            <div class="flex flex-wrap gap-2.5">
              @for (skill of skills; track skill) {
                <span class="px-4 py-2 bg-ink-50 rounded-lg border border-ink-100 text-sm text-ink-700 font-medium">
                  {{ skill }}
                </span>
              }
            </div>
          </div>

          <!-- Beyond the work -->
          <div class="mt-14">
            <h2 class="text-2xl font-bold text-ink-900 tracking-tight mb-6">
              Outside the engagement
            </h2>
            <div class="space-y-5 text-lg text-ink-600 leading-relaxed">
              <p>
                I mentor other developers, write about the problems I keep running into,
                and stay close to the Angular and .NET communities &mdash; which is a large
                part of how I know where each framework is heading before it lands on a
                client's roadmap.
              </p>
              <p>
                If you want a sense of how I think before you email me, the
                <a routerLink="/blog" class="text-accent-700 font-medium hover:text-accent-800 underline underline-offset-2">writing</a>
                is the honest version.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-cta
      heading="Think this might be your problem?"
      body="Tell me what you're running and what's forcing the change. If I'm not the right fit, I'll say so in the first reply." />
  `,
})
export default class AboutPageComponent {
  reasons = [
    {
      title: 'Both halves of the stack, held by the same person',
      body: 'Angular and .NET migrations are entangled. Contracts, auth, serialization, and build tooling all cross the boundary, and when a front-end contractor and a back-end contractor each own one side, the boundary is where the schedule goes to die. One person holding both removes that seam entirely.',
    },
    {
      title: 'You get the person who does the work',
      body: 'No account manager, no bench, no handoff to whoever was free that month. The person who scopes your project is the person writing the code, which also means the estimate comes from someone who will have to live with it.',
    },
    {
      title: 'Legacy work is the specialty, not the fallback',
      body: 'Most consultancies treat modernization as what you take when greenfield is quiet. It is the whole practice here, so the patterns — strangler-fig migrations, parallel running, incremental cutover — are well-worn rather than improvised.',
    },
  ];

  workingStyle = [
    'Written updates on a predictable rhythm, in language you can forward to a non-technical board.',
    'Estimates that separate what I am confident about from what I am not, instead of averaging the two into a single reassuring number.',
    "Your repository, your cloud account, your pipelines. Nothing important lives anywhere I control, and there is no lock-in to unpick if we stop.",
    'Bad news early. A slipping migration is survivable; a surprise one is not.',
    'A defined end. The goal is a team that no longer needs me, and I would rather be recommended than retained.',
  ];

  skills = [
    'Angular',
    'AngularJS migration',
    'C# / .NET',
    'ASP.NET Core',
    'TypeScript',
    'Azure',
    'SQL Server',
    'Entity Framework',
    'REST APIs',
    'Infrastructure as Code',
    'Docker',
    'CI/CD',
    'Tailwind CSS',
    'Git',
  ];
}
