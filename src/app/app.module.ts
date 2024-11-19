import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { AuthModule } from './features/auth/auth.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserModule } from './features/user/user.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HealthTrackModule } from './features/HealthTrack/healthTrack.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { PatientModule } from './features/patient/patient.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HealthTrackModule,
    AuthModule,
    BrowserAnimationsModule,
    DashboardModule,
    PatientModule,
    UserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
