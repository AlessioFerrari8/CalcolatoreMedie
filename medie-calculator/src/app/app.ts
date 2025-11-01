import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './nav-bar/nav-bar';
import { TextArea } from './text-area/text-area';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, TextArea],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('medie-calculator');
}
