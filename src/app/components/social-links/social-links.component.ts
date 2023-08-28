import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'w-full flex justify-center gap-4 mb-4 mt-4',
  },
})
export class SocialLinksComponent {
  @Input() public isPrimary = false;
  openLink(link: string) {
    window.open(link, '_blank');
  }
}
