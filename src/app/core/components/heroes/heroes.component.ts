import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/core/models/Hero';
import { HeroService } from 'src/app/core/services/hero/hero.service';
import { LoaderService } from '../../services/loader';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  displayedColumns = ['id', 'name'];

  constructor(
    private heroService: HeroService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.loader.show('Carregando Heroes...');

    this.heroService
      .getAll()
      .subscribe((heroes) => {
        this.heroes = heroes;
      })
      .add(() => this.loader.hide());
  }
}
