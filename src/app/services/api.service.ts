// api.service.ts  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://api.github.com/search/repositories';

    constructor(private http: HttpClient) { }

    search(query: string, batchSize = 5): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}?q=${query}&per_page=${batchSize}`);
    }
}