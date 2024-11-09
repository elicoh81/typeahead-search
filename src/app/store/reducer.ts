// reducer.ts  
import { createReducer, on } from '@ngrx/store';
import { loadSearchResultsSuccess, saveQuery } from './actions';
import { GithubRepo } from '../services/github-repo';

export interface SearchState {
    repositories: GithubRepo[];
    queries: Set<string>;
}

export const initialState: SearchState = {
    repositories: [],
    queries: new Set()
};

export const searchReducer = createReducer(
    initialState,
    on(loadSearchResultsSuccess, (state, { repositories }) => ({ ...state, repositories })),
    on(saveQuery, (state, { query }) => ({ ...state, queries: state.queries.add(query.toLowerCase().trim()) }))
);