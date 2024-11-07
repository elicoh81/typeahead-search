import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ScrollingModule,
    MatListModule,
    MatInputModule
  ],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.scss'
})
export class TypeaheadComponent {

  results = []

  onSearch(event: Event) {

  }

}
