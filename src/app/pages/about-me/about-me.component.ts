import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  public today = new Date();
  public bDay = new Date('12-08-1987');
  public thisYearBday = new Date(`${this.bDay.getMonth()}-${this.bDay.getDate()}-${this.today.getFullYear()}`)
  public yearDiff = this.today.getFullYear() - this.bDay.getFullYear();
  public age = this.today >= this.thisYearBday ? this.yearDiff + 1 : this.yearDiff;
}
