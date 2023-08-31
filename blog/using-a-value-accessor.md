---
title: 'Markdown test'
description: 'This is a sample post containing different types of markdown content to test'
date: 'Tue Aug 23 2022'
tags:
    - Reactive Forms
    - Template Driven Forms
published: true
---

# Control Value Accessors

## What are Control Value Accessors?

Control Value Accessors are a way to create custom form controls in Angular. They are used to bridge the gap between Angular Forms and Native DOM Elements. They are used to create custom form controls that can be used in Angular Forms.
Most of the use cases I've seen are for creating a wrapper around both the style of a control and the way it behaves.
For example let's say you want to create a dropdown for customers that will be used in a bunch of places in your app.
You could create a component that wraps a select element and styles it the way you want but what about binding the control
to your form group?

For example you could create a component like this:

```typescript
import {Component, inject} from "@angular/core";

@Component({
  selector: 'app-customer-dropdown',
  template: `
        <select [(ngModel)]="value" class="super-special-styling">
            <option [value]="undefined">--SELECT ONE ---</option>
            <option *ngFor="let customer of customers" [value]="customer.id">{{customer.name}}</option>
        </select>
    `
})
export class CustomerDropdownComponent {
  customerService = inject(CustomerService);
  value: number;
  customers = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Jane'},
    {id: 3, name: 'Bob'},
    {id: 4, name: 'Alice'},
  ]
}
```
