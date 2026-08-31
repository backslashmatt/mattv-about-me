import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CtaComponent } from './cta.component';

describe('CtaComponent', () => {
  let fixture: ComponentFixture<CtaComponent>;

  const html = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CtaComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(CtaComponent);
    fixture.detectChanges();
  });

  it('should point at contact as the primary action', () => {
    const primary = html().querySelector('a[href="/contact"]');
    expect(primary?.textContent?.trim()).toBe('Book a modernization assessment');
  });

  it('should offer services as the secondary action', () => {
    expect(html().querySelector('a[href="/services"]')).not.toBeNull();
  });

  it('should use the default copy when no inputs are supplied', () => {
    expect(html().querySelector('h2')?.textContent).toContain(
      'Find out what your migration actually involves.'
    );
  });

  it('should allow the copy to be overridden per page', () => {
    fixture.componentRef.setInput('heading', 'Custom heading');
    fixture.componentRef.setInput('body', 'Custom body copy.');
    fixture.detectChanges();

    expect(html().querySelector('h2')?.textContent).toContain('Custom heading');
    expect(html().textContent).toContain('Custom body copy.');
  });
});
