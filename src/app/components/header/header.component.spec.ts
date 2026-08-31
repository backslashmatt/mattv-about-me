import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const html = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render every primary nav link', () => {
    const labels = Array.from(html().querySelectorAll('nav a')).map((a) =>
      a.textContent?.trim()
    );

    for (const link of component.navLinks) {
      expect(labels).toContain(link.label);
    }
  });

  it('should offer the contact call to action in the desktop nav', () => {
    const cta = Array.from(html().querySelectorAll('a[href="/contact"]'));
    expect(cta.length).toBeGreaterThan(0);
    expect(cta[0].textContent?.trim()).toBe('Book an assessment');
  });

  it('should start with the mobile menu closed', () => {
    expect(component.mobileMenuOpen()).toBe(false);
    expect(html().querySelector('#mobile-menu')).toBeNull();
  });

  it('should toggle the mobile menu and keep aria-expanded in sync', () => {
    const button = html().querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();
    fixture.detectChanges();

    expect(component.mobileMenuOpen()).toBe(true);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(html().querySelector('#mobile-menu')).not.toBeNull();

    button.click();
    fixture.detectChanges();

    expect(component.mobileMenuOpen()).toBe(false);
    expect(html().querySelector('#mobile-menu')).toBeNull();
  });

  it('should close the mobile menu once a link is followed', () => {
    component.mobileMenuOpen.set(true);
    fixture.detectChanges();

    const link = html().querySelector('#mobile-menu a') as HTMLAnchorElement;
    link.click();
    fixture.detectChanges();

    expect(component.mobileMenuOpen()).toBe(false);
  });
});
