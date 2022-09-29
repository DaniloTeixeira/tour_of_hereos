import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateHeroPayload } from '../../models/CreateHeroPayload';
import { Hero } from '../../models/Hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly baseURL = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseURL);
  }

  getById(id: number): Observable<Hero> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<Hero>(url);
  }

  create(payload: CreateHeroPayload): Observable<Hero> {
    return this.http.post<Hero>(this.baseURL, payload);
  }

  update(id: number, payload: Hero): Observable<Hero> {
    const url = `${this.baseURL}/${id}`;

    return this.http.put<Hero>(url, payload);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseURL}/${id}`;

    return this.http.delete<void>(url);
  }
}
