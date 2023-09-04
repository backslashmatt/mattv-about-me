import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundComponent } from './components/playground/playground.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogComponent } from './pages/blog/blog.component';

const routes: Routes = [{
  path: 'about',
  component: AboutMeComponent,
  title: 'About Me'
}, {
  path: 'blog/:slug',
  component: BlogComponent,
}, {
  path: 'blog',
  component: BlogListComponent,
  title: 'Blog'
}, {
  path: '',
  component: AboutMeComponent,
}, {
  path: 'playground',
  component: PlaygroundComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
