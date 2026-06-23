import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Thinking } from '../../components/thinking/thinking';
import { Projects } from '../../components/projects/projects';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [Hero, About, Thinking, Projects],
  template: `
    <app-hero id="home"></app-hero>
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
