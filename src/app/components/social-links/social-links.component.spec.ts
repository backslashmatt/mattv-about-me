import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLinksComponent } from './social-links.component';

describe('SocialLinksComponent', () => {
  let component: SocialLinksComponent;
  let fixture: ComponentFixture<SocialLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocialLinksComponent],
    });
    fixture = TestBed.createComponent(SocialLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a link for every social profile', () => {
    const anchors = (fixture.nativeElement as HTMLElement).querySelectorAll('a');
    expect(anchors.length).toBe(component.links.length);
  });

  it('should render the email link as a mailto', () => {
    const anchors = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('a'));
    const email = anchors.find((a) => a.getAttribute('aria-label') === 'Email');
    expect(email?.getAttribute('href')).toBe('mailto:matthew.verry@lyraapps.com');
  });
});
