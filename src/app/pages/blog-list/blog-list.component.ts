import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BlogListComponent {
  scullyRouteService = inject(ScullyRoutesService);
  posts$ = this.scullyRouteService.available$.pipe(
      map((routes) => {
        console.log(routes);
        return routes.filter((route) => route.route.startsWith(`/blog/`))
            .sort((a: ScullyRoute, b) => (new Date(a['date']) > new Date(b['date']) ? -1 : 1));;
      })
    );

}
