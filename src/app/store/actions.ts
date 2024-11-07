// actions.ts  
import { createAction, props } from '@ngrx/store';

export const loadSearchResults = createAction('[Search] Load Results', props<{ query: string }>());
export const loadSearchResultsSuccess = createAction('[Search] Load Results Success', props<{ results: any[] }>());
export const loadSearchResultsFailure = createAction('[Search] Load Results Failure', props<{ error: any }>());
export const saveQuery = createAction('[Search] Save Query', props<{ query: string }>());