import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppConfigModule, OAuthStorageFactory } from './config/config.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './modules/home/home.module';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    AppConfigModule,
    AppRoutingModule,
    HomeModule,
    OAuthModule.forRoot({

      resourceServer: {
        allowedUrls: [`*`],
        sendAccessToken: true
      }
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: OAuthStorage, useFactory: OAuthStorageFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
