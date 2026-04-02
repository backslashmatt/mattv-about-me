import { Component } from '@angular/core';
import { SocialLinksComponent } from '../components/social-links/social-links.component';

@Component({
  standalone: true,
  imports: [SocialLinksComponent],
  template: `
    <div class="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <div class="flex flex-col md:flex-row items-start gap-12">
        <!-- Photo + Social -->
        <div class="w-full md:w-auto flex flex-col items-center flex-shrink-0">
          <img src="assets/MattV.jpg"
               alt="Matt Verry"
               width="280" height="330"
               class="rounded-2xl shadow-xl border-4 border-white mb-6"/>
          <app-social-links />
        </div>

        <!-- Bio -->
        <div class="flex-1">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">About Me</h1>
          <div class="w-16 h-1 bg-teal-600 rounded mb-8"></div>

          <div class="space-y-5 text-gray-600 text-lg leading-relaxed">
            <p>
              I'm a seasoned Full Stack .NET Developer specializing in Angular, adept at crafting
              top-notch web solutions. With extensive Angular proficiency, I create dynamic user
              interfaces and excel in single-page applications.
            </p>
            <p>
              My .NET mastery ensures robust back-end systems, efficient APIs, data security,
              and Infrastructure as Code. I've driven complex application development, optimized
              performance, and collaborated seamlessly in Agile setups.
            </p>
            <p>
              Passionate about staying current, I mentor peers and proactively contribute to the
              dev community. Meticulous, adaptable, and a strong communicator -- I'm poised to
              elevate projects with technical finesse and collaborative prowess.
            </p>
          </div>

          <!-- Skills grid -->
          <div class="mt-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">What I Work With</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              @for (skill of skills; track skill) {
                <span class="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 text-center shadow-sm">
                  {{ skill }}
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class AboutPageComponent {
  skills = [
    'Angular', 'C# / .NET', 'TypeScript',
    'Azure', 'SQL Server', 'REST APIs',
    'Tailwind CSS', 'Docker', 'Git',
  ];
}
