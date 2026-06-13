import {
  Component,
  AfterViewInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Project {
  name: string;
  role: string;
  description: string;
  tags: string[];
  github: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly projects = signal<Project[]>([
    {
      name: 'Sprintly',
      role: 'FULL-STACK INTERN DEVELOPER',
      description:
        'An Agile task management platform built during my Infosys internship. Features a drag-and-drop Kanban board, dynamic sprint columns, task CRUD with priority and due dates, and an analytics dashboard.',
      tags: ['Angular', 'TypeScript', 'FastAPI', 'Firebase'],
      github: 'https://github.com/Shehin360/Agile-Task-Management-Platform',
    },
    {
      name: 'EduPredict',
      role: 'ML ENGINEER',
      description:
        'Explainable student performance prediction system. Built a hybrid soft-voting ensemble with XGBoost achieving 89.3% accuracy, with SHAP-powered explainability and a full-stack FastAPI + React interface.',
      tags: ['Python', 'XGBoost', 'FastAPI', 'SHAP', 'React'],
      github: 'https://github.com/Shehin360/Edupredict',
    },
    {
      name: 'PhishGuard',
      role: 'ML ENGINEER',
      description:
        'Chrome extension for real-time phishing detection using machine learning. Trained SVM and Random Forest models achieving 94.2% accuracy, with a Flask backend and a lightweight JS frontend.',
      tags: ['Python', 'Flask', 'Scikit-learn', 'JavaScript'],
      github: 'https://github.com/Shehin360/PhishGuard',
    },
    {
      name: 'Tax Invoice App',
      role: 'DESKTOP APPLICATION',
      description:
        'Offline GST invoice manager built for a real client — M A P Spices, Kerala. Desktop app with invoice generation, customer and product management, and a live dashboard. Built with Angular and Electron.',
      tags: ['Electron', 'HTML' ,'CSS' , 'JavaScript',  'SQLite'],
      github: 'https://github.com/Shehin360/Tax-Invoice-App',
    },
  ]);

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Section heading
    gsap.fromTo(
      '.projects-heading',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-heading',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Cards stagger
    gsap.fromTo(
      '.project-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          once: true,
        },
      }
    );
  }
}
