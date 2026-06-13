import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Nav } from './components/nav/nav';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
