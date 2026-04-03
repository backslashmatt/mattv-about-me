import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { DatePipe } from '@angular/common';

interface PostAttributes {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  slug: string;
}

@Component({
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Blog</h1>
      <div class="w-16 h-1 bg-teal-600 rounded mb-10"></div>

      @if (posts.length === 0) {
        <p class="text-gray-500 text-lg">No posts yet. Check back soon!</p>
      }

      <div class="space-y-6">
        @for (post of posts; track post.slug) {
          <article class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div class="flex items-center gap-2 mb-3">
              @for (tag of post.attributes.tags; track tag) {
                <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700">
                  {{ tag }}
                </span>
              }
              <span class="text-gray-400 text-sm ml-auto">{{ post.attributes.date | date }}</span>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
              <a [routerLink]="'/blog/' + post.slug">{{ post.attributes.title }}</a>
            </h2>
            <p class="text-gray-600 mb-4">{{ post.attributes.description }}</p>
            <a [routerLink]="'/blog/' + post.slug"
               class="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors text-sm">
              Read more
              <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </article>
        }
      </div>
    </div>
  `,
})
export default class BlogListPageComponent {
  posts = injectContentFiles<PostAttributes>((file) =>
    file.filename.includes('src/content/blog/')
  )
    .filter((post) => post.attributes.published)
    .sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime());
}
