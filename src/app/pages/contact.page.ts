import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { RouteMeta } from '@analogjs/router';
import { SocialLinksComponent } from '../components/social-links/social-links.component';
import { pageMeta, pageTitle } from '../seo';
import { site } from '../site.config';

const description =
  'Get in touch with Lyra about pitch-n, rep-n or quest-n, or about an inventory or build-out system you want fixed or replaced.';

export const routeMeta: RouteMeta = {
  title: pageTitle('Contact'),
  meta: pageMeta({
    title: `Contact ${site.name}`,
    description,
    path: '/contact',
  }),
};

@Component({
  imports: [RouterLink, SocialLinksComponent],
  template: `
    <section class="bg-ink-950 text-white">
      <div class="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <p class="text-accent-300 font-medium mb-5 text-sm tracking-wide uppercase">Contact</p>
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          Get in touch
        </h1>
        <p class="text-lg md:text-xl text-ink-300 leading-relaxed max-w-2xl mb-9">
          Lyra is run by Matt Verry in Arizona, and every email goes straight to him.
          No form, no funnel. Questions about the apps are welcome, and so is a system
          that needs work.
        </p>
        <a [href]="mailto"
           class="inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent-500 text-ink-950 rounded-lg font-semibold hover:bg-accent-400 transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
          </svg>
          {{ email }}
        </a>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-6 py-20 md:py-24">
      <div class="grid md:grid-cols-2 gap-14 md:gap-16">
        <!-- What to include -->
        <div>
          <h2 class="text-2xl font-bold text-ink-900 tracking-tight mb-4">
            If it's about a system
          </h2>
          <p class="text-ink-600 leading-relaxed mb-7">
            None of it is required &mdash; a single paragraph is a perfectly good start.
            But the more of this you include, the more useful the first reply will be.
          </p>
          <ul class="space-y-4">
            @for (item of includeItems; track item.label) {
              <li>
                <p class="font-semibold text-ink-900 mb-1">{{ item.label }}</p>
                <p class="text-ink-600 text-[15px] leading-relaxed">{{ item.detail }}</p>
              </li>
            }
          </ul>
        </div>

        <!-- What happens next -->
        <div>
          <h2 class="text-2xl font-bold text-ink-900 tracking-tight mb-4">
            What happens next
          </h2>
          <p class="text-ink-600 leading-relaxed mb-7">
            The path from an email to a signed scope is short and has no surprises in it.
          </p>
          <ol class="space-y-6">
            @for (step of steps; track step.title; let i = $index) {
              <li class="flex gap-4">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-accent-50 text-accent-800 font-bold flex items-center justify-center text-sm border border-accent-100">
                  {{ i + 1 }}
                </span>
                <div>
                  <p class="font-semibold text-ink-900 mb-1">{{ step.title }}</p>
                  <p class="text-ink-600 text-[15px] leading-relaxed">{{ step.detail }}</p>
                </div>
              </li>
            }
          </ol>
        </div>
      </div>

      <!-- Reassurance -->
      <div class="mt-16 pt-12 border-t border-ink-100 grid sm:grid-cols-3 gap-8">
        @for (note of notes; track note.title) {
          <div>
            <h3 class="font-bold text-ink-900 mb-2">{{ note.title }}</h3>
            <p class="text-ink-600 text-[15px] leading-relaxed">{{ note.body }}</p>
          </div>
        }
      </div>

      <!-- Elsewhere -->
      <div class="mt-16 pt-12 border-t border-ink-100 text-center">
        <h2 class="text-xl font-bold text-ink-900 mb-2">Matt elsewhere</h2>
        <p class="text-ink-600 mb-6">
          Not ready to email? The
          <a routerLink="/blog" class="text-accent-700 font-medium hover:text-accent-800 underline underline-offset-2">writing</a>
          is a decent way to get a feel for the work.
        </p>
        <app-social-links />
      </div>
    </div>
  `,
})
export default class ContactPageComponent {
  email = site.email;

  /**
   * Pre-filling the subject means the enquiry arrives already labelled, and it
   * nudges the sender toward the detail that makes a first reply useful.
   */
  mailto =
    `mailto:${site.email}` +
    `?subject=${encodeURIComponent('Lyra enquiry')}`;

  includeItems = [
    {
      label: 'What the system does',
      detail: 'One or two sentences on what it tracks (stock, sites, materials, crews) and who uses it. Technical detail matters less than this does.',
    },
    {
      label: 'Roughly what it is built on',
      detail: 'Framework versions and the systems it talks to (ERP, field apps, spreadsheets) if you know them, a guess if you do not. "Some AngularJS thing from 2016" is a genuinely useful answer.',
    },
    {
      label: 'What is forcing the change',
      detail: 'Counts nobody trusts, an ERP upgrade, a new site, an audit, a departure, or simply that it has become too slow to change.',
    },
    {
      label: 'Any date you are working to',
      detail: 'A hard deadline changes the shape of the plan considerably, so it is better to know at the start than halfway in.',
    },
  ];

  steps = [
    {
      title: 'You email Matt',
      detail: 'It goes straight to his inbox. Nothing is automated and no one else reads it.',
    },
    {
      title: 'He replies, usually within two business days',
      detail: 'Either with questions, or with the honest answer that this is not something Lyra should take on.',
    },
    {
      title: 'A call',
      detail: 'No slides, no pitch deck. Mostly questions about the system and how it got here.',
    },
    {
      title: 'A written scope',
      detail: 'Before you commit to anything. If it is not right, that is a perfectly fine place to stop.',
    },
  ];

  notes = [
    {
      title: 'Your details stay yours',
      body: 'Nothing you send gets added to a mailing list, a CRM, or passed to anyone else. There is no newsletter to be enrolled in.',
    },
    {
      title: 'NDAs are fine',
      body: 'If you need one in place before describing the system in any detail, send yours over and Lyra will sign it.',
    },
    {
      title: 'Early questions are welcome',
      body: 'You do not need a decision made to email. Working out whether this is even the right project is part of the job.',
    },
  ];
}
