import {
  Component,
  AfterViewInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface StackGroup {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-thinking',
  standalone: true,
  templateUrl: './thinking.html',
  styleUrl: './thinking.css',
})
export class Thinking implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly stack = signal<StackGroup[]>([
    {
      category: 'Frontend',
      items: ['Angular', 'TypeScript', 'HTML/CSS', 'RxJS', 'GSAP'],
    },
    {
      category: 'Backend',
      items: ['FastAPI', 'Firebase', 'SQLite', 'REST APIs'],
    },
    {
      category: 'ML / AI',
      items: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'SHAP'],
    },
    {
      category: 'Tools',
      items: ['Git', 'Docker', 'VS Code', 'Figma', 'Linux'],
    },
  ]);

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Section fade in
    gsap.fromTo(
      '.thinking-content',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.thinking-content',
          start: 'top 80%',
          once: true,
        },
      }
    );

    // Stack card
    gsap.fromTo(
      '.stack-card',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stack-card',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Stack groups stagger
    gsap.fromTo(
      '.stack-group',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.stack-groups',
          start: 'top 85%',
          once: true,
        },
      }
    );
  }
}
