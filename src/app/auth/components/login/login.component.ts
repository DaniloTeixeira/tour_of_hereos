import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/services/loader';
import { NotificationService } from 'src/app/core/services/notification';
import { LoginPayload } from '../../models/LoginPayload';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  hide = true;

  destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loader: LoaderService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loginAttempt();
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  private loginAttempt(): void {
    const payload = this.form.value;

    this.loader.show('Efetuando login...');

    if (!this.isValidPassword()) {
      setTimeout(() => {
        this.loader.hide();
        this.notification.error('Usuário ou senha inválidos.');
      }, 500);
      return;
    }

    this.login(payload);
  }

  private isValidPassword(): boolean {
    const password = this.form.controls.password.value;

    return password === '12345678';
  }

  private login(payload: LoginPayload): void {
    this.authService
      .login(payload)
      .pipe(takeUntil(this.destroyed$), delay(500))
      .subscribe(() => {
        this.notification.success('Login efetuado com sucesso');
        this.router.navigate(['/heroes']);
      })
      .add(() => this.loader.hide());
  }
}
