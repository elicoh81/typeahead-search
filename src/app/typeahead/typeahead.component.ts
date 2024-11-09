import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { GithubRepo } from '../services/github-repo';
import { Store } from '@ngrx/store';
import { loadSearchResults } from '../store/actions';
import { CommonModule } from '@angular/common';
import { SearchState } from '../store/reducer';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ScrollingModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent {
  repositories$: Observable<GithubRepo[]>;
  queries$: Observable<string[]>
  myControl = new FormControl('');

  constructor(private store: Store<{ search: SearchState }>) {
    this.repositories$ = this.store.select(state => state.search.repositories);
    this.queries$ = this.store.select(state => state.search.queries);
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.store.dispatch(loadSearchResults({ query }));
  }

}
