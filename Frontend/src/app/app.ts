import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormUsers } from './components/form-users/form-users';
import { Entries } from './components/entries/entries';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormUsers, Entries],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
}
