import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { DatePipe } from '@angular/common';
import type { RouteMeta } from '@analogjs/router';
import { CtaComponent } from '../../components/cta/cta.component';
import { pageMeta, pageTitle } from '../../seo';

interface PostAttributes {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  slug: string;
}

const description =
  'Notes on modernizing legacy .NET and Angular applications — migration patterns, framework upgrades, and the problems that keep coming up in older codebases.';

export const routeMeta: RouteMeta = {
  title: pageTitle('Writing'),
  meta: pageMeta({
    title: 'Writing — Matt Verry',
    description,
    path: '/blog',
  }),
};

@Component({
  imports: [RouterLink, DatePipe, CtaComponent],
  template: `
    <div class="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 class="text-4xl md:text-5xl font-bold text-ink-900 tracking-tight mb-4">Writing</h1>
      <p class="text-lg text-ink-600 leading-relaxed mb-12 max-w-2xl">
        Notes from inside older codebases &mdash; migration patterns, framework upgrades,
        and the problems that turn up again and again once an application has been in
        production long enough.
      </p>

      @if (posts.length === 0) {
        <p class="text-ink-500 text-lg">No posts published yet. Check back soon.</p>
      }

      <div class="space-y-5">
        @for (post of posts; track post.slug) {
          <article class="bg-white rounded-xl p-6 md:p-7 border border-ink-100 shadow-card hover:shadow-lift transition-shadow group">
            <div class="flex flex-wrap items-center gap-2 mb-3">
              @for (tag of post.attributes.tags; track tag) {
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-50 text-accent-800 border border-accent-100">
                  {{ tag }}
                </span>
              }
              <time class="text-ink-400 text-sm ml-auto" [attr.datetime]="post.attributes.date">
                {{ post.attributes.date | date }}
              </time>
            </div>
            <h2 class="text-xl font-bold text-ink-900 mb-2 group-hover:text-accent-700 transition-colors">
              <a [routerLink]="'/blog/' + post.slug">{{ post.attributes.title }}</a>
            </h2>
            <p class="text-ink-600 mb-4 leading-relaxed">{{ post.attributes.description }}</p>
            <a [routerLink]="'/blog/' + post.slug"
               class="inline-flex items-center text-accent-700 font-semibold hover:text-accent-800 transition-colors text-[15px]">
              Read more
              <svg class="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </article>
        }
      </div>
    </div>

    <app-cta
      heading="Reading this because you have one of these systems?"
      body="If the codebase behind the question is one you are responsible for, an assessment turns it into a plan with dates and numbers attached." />
  `,
})
export default class BlogListPageComponent {
  posts = injectContentFiles<PostAttributes>((file) =>
    file.filename.includes('src/content/blog/')
  )
    .filter((post) => post.attributes.published)
    .sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime());
}
