// api.service.ts  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GithubRepo, GithubResponse } from './github-repo';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://api.github.com/search/repositories';

    constructor(private http: HttpClient) { }

    search(query: string, batchSize = 20): Observable<{ items: GithubRepo[] }> {
        return this.http.get<GithubResponse>(`${this.apiUrl}?q=${query}&per_page=${batchSize}`).pipe(tap(response => console.log('API response:', response)));
    }
}