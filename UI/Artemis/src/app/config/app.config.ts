import { InjectionToken } from "@angular/core";
import { AppConfig } from "../shared/models/app-config/app-config.interface";
import * as appIps from "../../assets/data/app.settings.json";


export let APP_CONFIG = new InjectionToken("app.config");

export const APP_CONFIG_VALUE: AppConfig = {
  appId: "2A108563-6752-4DC3-813E-6E77CCAB67AF",
  appTitle: "Digital Rock",
  lobName: "Digirock",
  lob: "DigitalRock",
  cacheTime: 7200, // Time in seconds (2 HRS)
  region: "USA",
  businessEntity: "ARTEMIS",
  businessSubEntity: "Migration Programme",
  enablePing: appIps.enablePing,
  landingPageUrl: appIps.diracHomeUrl,
}
