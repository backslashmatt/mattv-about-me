import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the current year in the copyright line', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.currentYear).toBe(new Date().getFullYear());
    expect(compiled.textContent).toContain(`${component.currentYear} Matt Verry`);
  });
});
