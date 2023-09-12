import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, of } from 'rxjs';

enum CustomerType {
  Individual = 'Individual',
  Business = 'Business',
}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class PlaygroundComponent implements OnInit {
  customerTypes = {
    Individual: CustomerType.Individual,
    Business: CustomerType.Business,
  };
  customers = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
    { id: 4, name: 'Alice' },
  ]
  customerService = { getCustomers: (id: string | null) => of(this.customers) };
  router = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  form = this.fb.group({
    name: this.fb.control<string | undefined>(undefined),
    type: this.fb.control<CustomerType | undefined>(undefined),
    optionalEIN: this.fb.control<string | undefined>({ value: undefined, disabled: true }, Validators.required),
  });

  formTypeSignal = toSignal(this.form.controls.type.valueChanges);
  formTypeEffect = effect(() => {
    const type = this.formTypeSignal();
    if (type === CustomerType.Business) {
      this.form.controls.optionalEIN.enable();
    } else {
      this.form.controls.optionalEIN.disable();
    }
  })

  value?: number;

  id$ = this.router.paramMap.pipe(map((params: ParamMap) => params.get('id')), takeUntilDestroyed());
  customers$?: Observable<{ id: number, name: string }[]>;

  ngOnInit() {
    this.id$.subscribe((id: string | null) =>
        this.customers$ = this.customerService.getCustomers(id));
  }
}
