import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../services/loader';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private activeRequest = 0;

  constructor(private loader: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.activeRequest === 0) {
      this.loader.show();
    }

    this.activeRequest++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequest = this.activeRequest--;

        if (this.activeRequest === 0) {
          this.loader.hide();
        }
      })
    );
  }
}
