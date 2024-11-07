// reducer.ts  
import { createReducer, on } from '@ngrx/store';
import { loadSearchResultsSuccess, saveQuery } from './actions';

export interface SearchState {
    results: any[];
    queries: string[];
}

export const initialState: SearchState = {
    results: [],
    queries: []
};

export const searchReducer = createReducer(
    initialState,
    on(loadSearchResultsSuccess, (state, { results }) => ({ ...state, results })),
    on(saveQuery, (state, { query }) => ({ ...state, queries: [...state.queries, query] }))
);