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
    <app-liquid-hero id="home" [name]="'Shehin T Shaji'"></app-liquid-hero>
    <app-about id="aboutme"></app-about>
    <app-thinking id="skills"></app-thinking>
    <app-projects id="projects"></app-projects>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AboutPage {}
