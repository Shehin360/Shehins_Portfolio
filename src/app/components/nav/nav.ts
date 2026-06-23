import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected readonly scrolled = signal(false);
  protected readonly activeSection = signal('home');

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 50);
    // Simple scroll spy logic could be added here later
  }

  setActive(section: string): void {
    this.activeSection.set(section);
  }
}
