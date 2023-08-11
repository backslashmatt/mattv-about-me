import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ScullyLibModule} from "@scullyio/ng-lib";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  imports: [CommonModule, ScullyLibModule, RouterModule],
  standalone: true
})
export class BlogComponent {

}
