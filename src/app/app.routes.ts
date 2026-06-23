import { Routes } from '@angular/router';
import { AboutPage } from './pages/about/about.page';
import { WorkPage } from './pages/work/work.page';

export const routes: Routes = [
  { path: '', component: AboutPage, title: 'Shehin T Shaji' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
