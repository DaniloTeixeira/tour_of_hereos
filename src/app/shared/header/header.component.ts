import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services';
import { LoaderService } from 'src/app/core/services/loader';
import { NotificationService } from 'src/app/core/services/notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  title = 'Tour Of Heroes';

  destroyed$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    private loader: LoaderService,
    private notification: NotificationService
  ) {}

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logoutAttempt(): void {
    this.loader.show('Efetuando logout...');

    setTimeout(() => {
      this.logout();
    }, 500);
  }

  private logout(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.notification.success('Logout efetuado com sucesso!');
      })
      .add(() => this.loader.hide());
  }
}
