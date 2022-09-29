import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../services/notification';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor(private notification: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse): Observable<any> => {
        let errorMsg = '';

        if (e.error instanceof ErrorEvent) {
          errorMsg = `Erro: ${e.error.message}`;
        } else {
          errorMsg = `Código do Erro: ${e.status}, Mensagem: ${e.message}`;
        }

        return of(this.notification.error(errorMsg));
      })
    );
  }
}
