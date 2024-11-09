// actions.ts  
import { createAction, props } from '@ngrx/store';
import { GithubRepo } from '../services/github-repo';

export const loadSearchResults = createAction('[Search] Load Results', props<{ query: string, pageNumber: number, append?: boolean }>());
export const loadSearchResultsSuccess = createAction('[Search] Load Results Success', props<{ repositories: GithubRepo[], append: boolean }>());
export const loadSearchResultsFailure = createAction('[Search] Load Results Failure', props<{ error: any }>());
export const saveQuery = createAction('[Search] Save Query', props<{ query: string }>());