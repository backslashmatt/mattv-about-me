import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SocialLinksComponent } from '../../components/social-links/social-links.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, SocialLinksComponent],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
}
