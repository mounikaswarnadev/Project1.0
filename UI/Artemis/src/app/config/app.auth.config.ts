import { InjectionToken } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import * as appIps from '../../assets/data/app.settings.json';

export let APP_AUTH_CONFIG = new InjectionToken('app.auth.config');

export const AppAuthConfig = {
  url: ""
}
// Ping Auth
export const authConfig: AuthConfig = {
  issuer: appIps.issuer,
  redirectUri: appIps.redirectUri,
  clientId: appIps.clientId,
  responseType: appIps.responseType,
  scope: appIps.scope,
  silentRefreshTimeout: 1000 * 60
}
