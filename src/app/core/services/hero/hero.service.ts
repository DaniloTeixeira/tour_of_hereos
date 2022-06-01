import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HEROES } from '../../data/heroes';
import { Hero } from '../../models/Hero';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    const _heroes = of(HEROES);

    return _heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((hero) => hero.id === id)!;

    this.messageService.addMessage(`HeroService: fetched hero id = ${id}`);

    return of(hero);
  }
}
