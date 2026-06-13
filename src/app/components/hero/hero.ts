import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  viewChild,
  signal,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly heroLines = signal([
    'Computer Science, Kochi',
    'Builds things that actually work',
    'ML nerd. Full-stack dev.',
  ]);

  readonly heroSection = viewChild<ElementRef>('heroSection');

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');

    // Stagger hero name
    gsap.fromTo(
      '.hero-name span',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.3,
      }
    );

    // Stagger hero ghost lines
    gsap.fromTo(
      '.hero-line',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.25,
        delay: 0.6,
      }
    );

    // Anchor line
    gsap.fromTo(
      '.hero-anchor',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 1.6,
      }
    );

    // Floating decorative elements
    gsap.utils.toArray<HTMLElement>('.floating-shape').forEach((el, i) => {
      gsap.to(el, {
        rotation: 360,
        duration: 20 + i * 5,
        repeat: -1,
        ease: 'none',
      });
      gsap.fromTo(
        el,
        { y: -10 },
        {
          y: 10,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }
      );
    });

    // Scroll arrow pulse
    gsap.to('.scroll-arrow', {
      y: 5,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  scrollToAbout(): void {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
