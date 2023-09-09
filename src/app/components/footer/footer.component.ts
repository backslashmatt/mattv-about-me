import { CommonModule } from '@angular/common';
import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FooterComponent {
  VERSION = VERSION;
  currentYear = new Date().getFullYear();
}
