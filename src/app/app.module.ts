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

import { UiModule } from './modules/ui/ui.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/login/login.effects';
import { AppEffects } from './store/app.effects';

import * as loginFeature from './store/login/login.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ProgressBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(loginFeature.loginFeatureKey, loginFeature.loginReducer),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }) : [],
    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([LoginEffects]),
  ],
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
