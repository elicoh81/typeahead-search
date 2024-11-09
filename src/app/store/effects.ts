// effects.ts  
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { loadSearchResults, loadSearchResultsSuccess, loadSearchResultsFailure } from './actions';
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
                    map(response => {
                        console.log("mapping to load search result success", response.items)
                        return loadSearchResultsSuccess({ repositories: response.items });
                    }),
                    catchError(error => of(loadSearchResultsFailure({ error })))
                )
            )
        )
    );
}