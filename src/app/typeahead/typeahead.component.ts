import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { combineLatestWith, map, Observable, startWith } from 'rxjs';
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
export class TypeaheadComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  repositories$: Observable<GithubRepo[]>;
  queries$: Observable<string[]>
  myControl = new FormControl('');
  currentPage = 0;

  constructor(private store: Store<{ search: SearchState }>) {
    this.repositories$ = this.store.select(state => state.search.repositories);
    this.queries$ = this.store.select(state => state.search.queries);
  }
  ngOnInit() {
    this.queries$ = this.myControl.valueChanges.pipe(
      startWith(''),
      combineLatestWith(this.queries$),
      map(([value, options]) => this._filter(value || '', options)),
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
  onSearch(query: string) {
    this.store.dispatch(loadSearchResults({ query, pageNumber: this.currentPage }));
  }

  loadMore() {
    this.currentPage++;
    this.store.dispatch(loadSearchResults({ query: this.searchInput.nativeElement.value, pageNumber: this.currentPage, append: true }));
  }

}
