import { Component } from '@angular/core';
import { LiquidHeroComponent } from '../../components/liquid-hero/liquid-hero.component';
import { About } from '../../components/about/about';
import { Thinking } from '../../components/thinking/thinking';
import { Projects } from '../../components/projects/projects';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [LiquidHeroComponent, About, Thinking, Projects],
  template: `
    <div class="bento-layout container">
      <div class="bento-hero">
        <app-liquid-hero id="home" [name]="'Shehin T Shaji'"></app-liquid-hero>
      </div>
      
      <div class="bento-about glass-panel">
        <app-about id="aboutme"></app-about>
      </div>
      
      <div class="bento-skills glass-panel">
        <app-thinking id="skills"></app-thinking>
      </div>
      
      <div class="bento-projects glass-panel">
        <app-projects id="projects"></app-projects>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: var(--space-xl) 0;
    }

    .bento-layout {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-auto-rows: minmax(100px, auto);
      gap: var(--space-md);
    }

    /* Bento Grid Placements */
    .bento-hero {
      grid-column: span 12;
    }

    .bento-about {
      grid-column: span 5;
      padding: var(--space-lg);
    }

    .bento-skills {
      grid-column: span 7;
      padding: var(--space-lg);
    }

    .bento-projects {
      grid-column: span 12;
      padding: var(--space-lg);
    }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
      .bento-about, .bento-skills {
        grid-column: span 12;
      }
    }
  `]
})
export class AboutPage {}
