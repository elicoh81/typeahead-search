import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { GithubRepo } from '../services/github-repo';
import { Store } from '@ngrx/store';
import { loadSearchResults } from '../store/actions';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ScrollingModule,
    MatListModule,
    MatInputModule,
    CommonModule,
    NgIf
  ],
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent {

  repositories$: Observable<GithubRepo[]>;

  constructor(private store: Store<{ search: { repositories: GithubRepo[] } }>) {
    this.repositories$ = this.store.select(state => state.search.repositories);
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.store.dispatch(loadSearchResults({ query }));
  }

}
