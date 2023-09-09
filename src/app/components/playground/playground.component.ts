import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class PlaygroundComponent implements OnInit {
  customerService = { getCustomers: (id: string | null) => of(this.customers) };
  router = inject(ActivatedRoute);

  value?: number;
  customers = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
    { id: 4, name: 'Alice' },
  ]

  id$ = this.router.paramMap.pipe(map((params: ParamMap) => params.get('id')), takeUntilDestroyed());
  customers$?: Observable<{ id: number, name: string }[]>;

  ngOnInit() {
    this.id$.subscribe((id: string | null) =>
        this.customers$ = this.customerService.getCustomers(id));
  }
}
