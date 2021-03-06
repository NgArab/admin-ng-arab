import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpHeadersInterceptor } from '@core/http-headers.interceptor';
import { LoadingInterceptor } from '@core/loading.interceptor';
import { HeaderComponent } from '@shared/header/header.component';
import { FooterComponent } from '@shared/footer/footer.component';
import { ProgressBarComponent } from '@shared/progress-bar/progress-bar.component';
import { RootStoreModule } from './root-store/root-store.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ProgressBarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, RootStoreModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
