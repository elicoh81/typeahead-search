import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TypeaheadComponent } from './typeahead/typeahead.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TypeaheadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'typeahead-search';
}
