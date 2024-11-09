// effects.ts  
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, debounceTime, map, mergeMap, switchMap } from 'rxjs/operators';
import { loadSearchResults, loadSearchResultsSuccess, loadSearchResultsFailure, saveQuery } from './actions';
import { ApiService } from '../services/api.service';

@Injectable()
export class SearchEffects {
    constructor(private actions$: Actions, private apiService: ApiService) { }

    loadSearchResults$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSearchResults),
            debounceTime(300),
            switchMap(action =>
                this.apiService.search(action.query).pipe(
                    mergeMap(response => {
                        return [
                            loadSearchResultsSuccess({ repositories: response.items }),
                            saveQuery({ query: action.query })
                        ];
                    }),
                    catchError(error => of(loadSearchResultsFailure({ error })))
                )
            )
        )
    );
}