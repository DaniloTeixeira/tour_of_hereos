import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../../models/Hero';
import { HeroService } from '../../services/hero';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() label?: string;
  @Output() private selectedHero = new EventEmitter<Hero>();

  heroes$!: Observable<Hero[]>;

  destroyed$ = new Subject<void>();

  private searchQuery$ = new Subject<string>();

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.searchOnType();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  searchHeroes(query: string): void {
    this.searchQuery$.next(query);
  }

  onSelected(selectedItem: MatAutocompleteSelectedEvent): void {
    const hero = selectedItem.option.value;

    this.searchQuery$.next('');

    this.selectedHero.emit(hero);
  }

  private searchOnType(): void {
    this.heroes$ = this.searchQuery$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((query) => this.heroService.search(query))
    );
  }
}
