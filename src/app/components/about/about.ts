import {
  Component,
  AfterViewInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);



  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Section fade in
    gsap.fromTo(
      '.about-content',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          once: true,
        },
      }
    );

    // Portrait parallax
    gsap.to('.about-portrait', {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

  }
}
