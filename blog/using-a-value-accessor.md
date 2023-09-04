---
title: 'Take Until Destroyed'
description: 'Unsubscribing from observables from components'
date: 'Sun Sept 9th 2023'
tags:
    - RxJS
    - Angular v16
published: true
---

# Take Until Destroyed

On of my favorite new additions to angular is the new rxjs 'takeUntilDestroyed' operator.
This operator is a simple way to unsubscribe from observables when a component is destroyed. The reason I am so very
excited about this operator is because of the pattern here:

```typescript
import {Component, inject} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-customer-dropdown',
  template: `
        <div *ngIf="customers$ | async as customers">
          <ul>
            <li *ngFor="let customer of customers">{{customer.name}}</li>
          </ul>
        </div>
    `
})
export class CustomerDropdownComponent implements OnInit, OnDestroy {
  customerService = inject(CustomerService);
  router = inject(ActivatedRoute);

  customers$: Observable<Customer[]>;
  componentDestroyed$ = new Subject<void>();

  ngOnInit() {
    this.router.paramMap.pipe(takeUntil(this.componentDestroyed$)).subscribe((params: ParamMap) =>
        this.customers$ = this.customerService.getCustomers(params.get('id')));
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
```

This pattern has been used in some capacity in all the enterprise applications I have worked on, and I'm sure you have
seen this too. Whether you do you observable assignment in the constructor or in property assignment you likely have
some sort of version of this.

## What's the rub/problem?

The problem with this pattern, in my opinion, is with a team of N developers you will almost certainly have many times
when such things get missed. You could mitigate this by adding linting rules such as this one
[RxJS Angular | https://github.com/cartant/eslint-plugin-rxjs-angular/blob/main/docs/rules/prefer-takeuntil.md].
That method is very brute force though. Like in the example above, technically async pipe handles the unsubscribe on component destroy for you.
So this file would likely fail linting but all observables would be unsubscribed from.

Basically, through all this we will likely have unneeded `takeUntil`s and if you don't lint missed `takeUntil`s.
So you just rely on the PR process and that's good enough.

## A step in the right direction

With the release of Angular v16 we now have a new operator called `takeUntilDestroyed`. This operator is a simple way to
unsubscribe from observables when a component is destroyed. The operator is very simple and looks like this:

```typescript

import {Component, inject} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-customer-dropdown',
  template: `
        <div *ngIf="customers$ | async as customers">
          <ul>
            <li *ngFor="let customer of customers">{{customer.name}}</li>
          </ul>
        </div>
    `
})
export class CustomerDropdownComponent implements OnInit {
  customerService = inject(CustomerService);
  router = inject(ActivatedRoute);

  id$ = this.router.paramMap.pipe(map((params: ParamMap) => params.get('id')), takeUntilDestroyed());
  customers$: Observable<Customer[]>;

  ngOnInit() {
    this.id$.subscribe((id: string | null) =>
        this.customers$ = this.customerService.getCustomers(id));
  }
}
```

So as you can see we were able to drop the lifecycle hook for a little cleaner code, and we moved our observables to the
injection context. This also makes our code more declarative and easier to read.

Now obviously this won't solve all our problems. We still have to make sure we use the operator. But this is a step in
the right direction and for the love of all that's good I don't have to default to looking for the onDestroy lifecycle
for any component.

Thanks for reading and happy coding!

Matt v
