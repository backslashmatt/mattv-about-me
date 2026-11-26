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
    expect(primary?.textContent?.trim()).toBe('Get in touch');
  });

  it('should offer the services page as the default secondary action', () => {
    const secondary = html().querySelector('a[href="/services"]');
    expect(secondary?.textContent?.trim()).toBe('See the services');
  });

  it('should let a page point the secondary action somewhere more specific', () => {
    fixture.componentRef.setInput('secondaryLabel', 'See how a retirement works');
    fixture.componentRef.setInput('secondaryFragment', 'migration');
    fixture.detectChanges();

    const secondary = html().querySelector('a[href="/services#migration"]');
    expect(secondary?.textContent?.trim()).toBe('See how a retirement works');
  });

  it('should use the default copy when no inputs are supplied', () => {
    expect(html().querySelector('h2')?.textContent).toContain(
      'A question about the apps, or a system that needs work?'
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
