export interface AppConfig {
  appId: string;
  appTitle: string;
  lobName: string;
  lob: string;
  region: string;
  cacheTime: number;
  businessEntity: string;
  businessSubEntity: string;
  enablePing: boolean;
  landingPageUrl: string;
  apiUrls: ApiUrl;
}
export interface ApiUrl{
  sampleUrl: SampleUrl
}
export interface SampleUrl{
  getsamples: string;
  addsamples: string;
  editsamples: string;
}
