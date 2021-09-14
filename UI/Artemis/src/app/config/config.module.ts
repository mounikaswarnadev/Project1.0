import { NgModule } from '@angular/core';
import { APP_CONFIG, APP_CONFIG_VALUE } from './app.config';
import { OAuthStorage } from 'angular-oauth2-oidc';
export function OAuthStorageFactory(): OAuthStorage { return localStorage; }

@NgModule({
  providers: [
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    { provide: OAuthStorage, useFactory: OAuthStorageFactory }
  ]
})
export class AppConfigModule { }
