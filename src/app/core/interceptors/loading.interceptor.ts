import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpResponse, HttpEvent } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '@shared/loading.service';
import { Observable, of } from 'rxjs';
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loadingService.isLoading = true;
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.isLoading = false;
        }
      })
    );
  }
}
