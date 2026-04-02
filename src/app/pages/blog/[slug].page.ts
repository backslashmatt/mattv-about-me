import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';

interface PostAttributes {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  slug: string;
}

export default @Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, RouterLink],
  template: `
    <div class="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <a routerLink="/blog"
         class="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors mb-8 font-medium">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Blog
      </a>

      <article class="prose lg:prose-xl prose-gray prose-headings:text-gray-900 prose-a:text-teal-600 max-w-none">
        @if (post$ | async; as post) {
          <analog-markdown [content]="post.content" />
        }
      </article>

      <div class="mt-12 pt-8 border-t border-gray-200">
        <a routerLink="/blog"
           class="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors font-medium">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Blog
        </a>
      </div>
    </div>
  `,
})
class BlogPostPageComponent {
  post$ = injectContent<PostAttributes>({ customFilename: 'src/content/blog' });
}
