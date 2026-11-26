import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
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
    expect(compiled.textContent).toContain(`${component.currentYear} Lyra Software Applications LLC`);
  });

  it('should link to every primary section of the site', () => {
    const hrefs = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('a[href^="/"]')
    ).map((a) => a.getAttribute('href'));

    for (const link of component.siteLinks) {
      expect(hrefs).toContain(link.fragment ? `${link.path}#${link.fragment}` : link.path);
    }
  });

  it('should send visitors to the contact page rather than show an email address', () => {
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(html.querySelector('a[href="/contact"]')).not.toBeNull();
  });
});
