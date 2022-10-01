import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hero } from 'src/app/core/models/Hero';
import { HeroService } from 'src/app/core/services/hero/hero.service';
import { DialogContent } from '../../models/DialogContent';
import { LoaderService } from '../../services/loader';
import { NotificationService } from '../../services/notification';
import { ConfirmComponent } from '../confirm';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  displayedColumns = ['id', 'name', 'actions'];

  destroyed$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private loader: LoaderService,
    private heroService: HeroService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  openDialog(hero: Hero): any {
    const data: DialogContent = {
      cancelText: 'Cancelar',
      confirmText: 'Confirmar',
      content: `Deseja realmente excluir ${hero.name}? Esta ação não poderá ser desfeita.`,
    };

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '340px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((shouldDelete) => {
        if (!shouldDelete) {
          return;
        }

        this.delete(hero.id);
      });
  }

  onSelected(hero: Event): void {
    console.log(hero);
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

  delete(id: number): void {
    this.loader.show('Excluindo Hero...');

    this.heroService
      .delete(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.notification.success('Hero excluído com sucesso!');

          this.heroes = this.heroes.filter((h) => h.id !== id);
        },
        error: () => this.notification.error('Erro ao excluir Hero.'),
      })
      .add(() => this.loader.hide());
  }
}
