import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [{
  path: 'blog/:slug',
  component: BlogComponent,
}, {
  path: 'blog',
  component: BlogListComponent,
  title: 'Blog'
}, {
  path: '',
  component: HomeComponent,
  title: 'Home'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
