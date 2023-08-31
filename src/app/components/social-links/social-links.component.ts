import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  host: {
    class: 'w-full flex justify-center gap-4 mb-4 mt-4',
  },
})
export class SocialLinksComponent {
  @Input() public isPrimary = false;
  public readonly links = [{
    name: 'GitHub',
    url: 'https://github.com/backslashmatt',
    icon: 'bi bi-github',
  }, {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mattvdev/',
    icon: 'bi bi-linkedin',
  }, {
    name: 'Twitter',
    url: 'https://twitter.com/mattv_dev',
    icon: 'bi bi-twitter',
  }, {
    name: 'Mastodon',
    url: 'https://mstdn.social/@mattv',
    icon: 'bi bi-mastodon',
  }];

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
