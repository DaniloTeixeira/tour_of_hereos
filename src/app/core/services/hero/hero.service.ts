import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Hero } from '../../models/Hero';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly baseURL = 'http://localhost:3000/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseURL);
  }

  getById(id: number): Observable<Hero> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<Hero>(url);
  }

  create(payload: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.baseURL, payload);
  }

  update(payload: Hero, id: number): Observable<Hero> {
    const url = `${this.baseURL}/${id}`;

    return this.http.put<Hero>(url, payload);
  }

  private log(msg: string): void {
    this.messageService.addMessage(`HeroService: ${msg}`);
  }
}
