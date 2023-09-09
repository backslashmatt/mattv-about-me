import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule, SideBarComponent, FooterComponent],
  standalone: true
})
export class AppComponent implements OnInit {
  router = inject(Router)
  title = 'about-me';
  isMenuClosed = true;
  routeEvents$ = this.router.events.pipe(takeUntilDestroyed());

  public ngOnInit() {
    this.routeEvents$.subscribe(() => { this.isMenuClosed = true; });
  }

  public toggleMenu() {
    this.isMenuClosed = !this.isMenuClosed;
  }
}
