import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, SocialLinksComponent],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  routes = [{ path: 'blog', name: 'Blog' }, { path: 'about', name: 'About' }, { path: 'contact', name: 'Contact' }];
}
