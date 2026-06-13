import { Component } from '@angular/core';
import { About } from '../../components/about/about';
import { Thinking } from '../../components/thinking/thinking';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [About, Thinking],
  template: `
    <app-about></app-about>
    <app-thinking></app-thinking>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AboutPage {}
