import { Routes } from '@angular/router';
import { AboutPage } from './pages/about/about.page';
import { WorkPage } from './pages/work/work.page';

export const routes: Routes = [
  { path: '', component: AboutPage, title: 'Shehin T Shaji' },
  { path: 'about', redirectTo: '', pathMatch: 'full' },
  { path: 'work', component: WorkPage, title: 'Work — Shehin T Shaji' },
];
