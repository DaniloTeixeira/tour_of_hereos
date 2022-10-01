import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateHeroPayload } from '../../models/CreateHeroPayload';
import { Hero } from '../../models/Hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // private readonly baseURL = 'http://localhost:3000/heroes';
  private readonly baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hero[]> {
    const url = `${this.baseURL}/heroes`;

    return this.http.get<Hero[]>(url);
  }

  getById(id: number): Observable<Hero> {
    const url = `${this.baseURL}/heroes/${id}`;

    return this.http.get<Hero>(url);
  }

  search(query: string): Observable<Hero[]> {
    const url = `${this.baseURL}?name=${query}`;

    return this.http.get<Hero[]>(url);
  }

  create(payload: CreateHeroPayload): Observable<Hero> {
    const url = `${this.baseURL}/heroes`;

    return this.http.post<Hero>(url, payload);
  }

  update(id: number, payload: Hero): Observable<Hero> {
    const url = `${this.baseURL}/heroes/${id}`;

    return this.http.put<Hero>(url, payload);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseURL}/heroes/${id}`;

    return this.http.delete<void>(url);
  }
}
