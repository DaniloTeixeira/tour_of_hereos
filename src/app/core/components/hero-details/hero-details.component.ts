import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hero } from 'src/app/core/models/Hero';
import { HeroService } from 'src/app/core/services/hero/hero.service';
import { CreateHeroPayload } from '../../models/CreateHeroPayload';
import { LoaderService } from '../../services/loader';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  hero: Hero;
  mode: 'create' | 'update';

  destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private heroService: HeroService,
    private notification: NotificationService
  ) {}

  get title(): string {
    return this.mode === 'create' ? 'Criar' : 'Atualizar';
  }

  ngOnInit(): void {
    this.getHero();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      return;
    }

    this.mode === 'create' ? this.create() : this.update();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  private fillform(): void {
    this.form?.patchValue({
      id: this.hero.id,
      name: this.hero.name,
    });
  }

  private getHero(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId === 'new') {
      this.mode = 'create';
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

        this.fillform();
      })
      .add(() => this.loader.hide());
  }

  backToHeroList(): void {
    this.router.navigate(['heroes']);
  }

  private getUpdateHeroPayload(): Hero {
    const form = this.form.getRawValue();

    return {
      id: this.hero.id,
      name: form.name,
    };
  }

  private getCreateHeroPayload(): CreateHeroPayload {
    const form = this.form.getRawValue();

    return {
      name: form.name,
    };
  }

  private create(): void {
    const name = this.getCreateHeroPayload();

    this.loader.show('Criando Hero...');

    this.heroService
      .create(name)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.notification.success('Hero criado com sucesso!');
          this.backToHeroList();
        },
        error: () => this.notification.error('Erro ao criar usuário.'),
      })
      .add(() => this.loader.hide());
  }

  private update(): void {
    const payload = this.getUpdateHeroPayload();

    this.loader.show('Atualizando Hero...');

    this.heroService
      .update(this.hero.id, payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.notification.success('Hero atualizado com sucesso!');
          this.backToHeroList();
        },
        error: () => this.notification.error('Erro ao atualizar Hero.'),
      })
      .add(() => this.loader.hide());
  }
}
