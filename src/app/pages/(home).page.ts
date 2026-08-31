import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div class="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1 text-center md:text-left">
            <p class="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">Full Stack Developer</p>
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Hey, I'm<br/>
              <span class="text-teal-600">Matt Verry</span>
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Seasoned .NET &amp; Angular developer crafting robust web solutions,
              scalable APIs, and elegant user experiences.
            </p>
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <a routerLink="/about"
                 class="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/25">
                Learn More
              </a>
              <a routerLink="/blog"
                 class="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                Read Blog
              </a>
            </div>
          </div>
          <div class="flex-shrink-0">
            <img src="assets/MattV.jpg"
                 alt="Matt Verry"
                 width="320" height="376"
                 class="rounded-2xl shadow-2xl shadow-gray-300/50 border-4 border-white"/>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills preview -->
    <section class="max-w-5xl mx-auto px-6 py-20">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (skill of skills; track skill.title) {
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
              <span class="text-teal-600 text-lg">{{ skill.emoji }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ skill.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ skill.description }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export default class HomePageComponent {
  skills = [
    {
      emoji: '///',
      title: 'Angular & Frontend',
      description: 'Building dynamic SPAs with Angular, creating reusable component libraries and responsive interfaces.',
    },
    {
      emoji: '{;}',
      title: '.NET & Backend',
      description: 'Designing robust APIs, microservices, and scalable back-end systems with C# and .NET.',
    },
    {
      emoji: '>>>',
      title: 'Infrastructure & DevOps',
      description: 'Infrastructure as Code, CI/CD pipelines, and cloud deployments for production-ready applications.',
    },
  ];
}
