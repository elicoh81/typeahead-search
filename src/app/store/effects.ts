// effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { catchError, concatMap, debounceTime, mergeMap, takeWhile } from 'rxjs/operators';
import { loadSearchResults, loadSearchResultsSuccess, loadSearchResultsFailure, saveQuery, loadMore } from './actions';
import { ApiService } from '../services/api.service';

@Injectable()
export class SearchEffects {
  pageNumber = 0;
  constructor(private actions$: Actions, private apiService: ApiService) { }

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMore),
      debounceTime(300),
      concatMap(action =>
        this.apiService.search(action.query, this.pageNumber).pipe(
          catchError(error => {
            if (error.status === 403) {
              console.log('Received 403 Forbidden error. Retrying...');
              return timer(2000).pipe(
                mergeMap(() => this.apiService.search(action.query, this.pageNumber)),
                takeWhile((_, index) => index < 3),
                catchError(err => {
                  console.error('Max retries reached. Failing...');
                  return of(loadSearchResultsFailure({ error: err }));
                })
              );
            }
            return of(loadSearchResultsFailure({ error }));
          }),
          mergeMap(response => {
            if ("items" in response) {
              this.pageNumber++;
              return [loadSearchResultsSuccess({ repositories: response.items, append: true })];
            }
            return [];
          })
        )
      )
    )
  );

  loadSearchResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSearchResults),
      debounceTime(300),
      concatMap(action =>
        this.apiService.search(action.query, this.pageNumber).pipe(
          catchError(error => {
            if (error.status === 403) {
              console.log('Received 403 Forbidden error. Retrying...');
              return timer(2000).pipe(
                mergeMap(() => this.apiService.search(action.query, this.pageNumber)),
                takeWhile((_, index) => index < 3),
                catchError(err => {
                  console.error('Max retries reached. Failing...');
                  return of(loadSearchResultsFailure({ error: err }));
                })
              );
            }
            return of(loadSearchResultsFailure({ error }));
          }),
          mergeMap(response => {
            if ("items" in response) {
              this.pageNumber = 0
              return [
                loadSearchResultsSuccess({ repositories: response.items, append: false }),
                saveQuery({ query: action.query })
              ]
            }
            return [];
          })
        )
      )
    )
  );
}
