import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hero } from 'src/app/core/models/Hero';
import { HeroService } from 'src/app/core/services/hero/hero.service';
import { LoaderService } from '../../services/loader';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit, OnDestroy {
  hero: Hero;
  mode: 'create' | 'update';

  destroyed$ = new Subject<void>();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private heroService: HeroService
  ) {}

  get title(): string {
    return this.mode === 'create' ? 'Criar' : 'Atualizar';
  }

  ngOnInit(): void {
    this.getHero();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private getHero(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId === 'new') {
      this.mode = 'create';
      this.hero = { name: '' } as Hero;
      return;
    }

    this.mode = 'update';

    const id = Number(paramId);

    this.getHeroRequest(id);
  }

  private getHeroRequest(id: number): void {
    this.loader.show('Buscando Hero...');

    this.heroService
      .getById(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((hero) => {
        this.hero = hero;
      })
      .add(() => this.loader.hide());
  }

  goBack(): void {
    this.location.back();
  }

  create(): void {
    this.loader.show('Criando Hero...');

    this.heroService
      .create(this.hero)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.goBack())
      .add(() => this.loader.hide());
  }

  update(): void {
    this.loader.show('Atualizando Hero...');

    this.heroService
      .update(this.hero, this.hero.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.goBack())
      .add(() => this.loader.hide());
  }
}
