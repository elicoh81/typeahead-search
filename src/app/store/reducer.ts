import { createReducer, on } from '@ngrx/store';
import { loadSearchResultsSuccess, saveQuery } from './actions';
import { GithubRepo } from '../services/github-repo';

export interface SearchState {
    repositories: GithubRepo[];
    queries: string[];
}

export const initialState: SearchState = {
    repositories: [],
    queries: []
};

export const searchReducer = createReducer(
    initialState,
    on(loadSearchResultsSuccess, (state, { repositories }) => ({ ...state, repositories })),
    on(saveQuery, (state, { query }) => {
        if (!state.queries.includes(query)) {
            return { ...state, queries: [...state.queries, query] };
        } else {
            return state;
        }
    })
);