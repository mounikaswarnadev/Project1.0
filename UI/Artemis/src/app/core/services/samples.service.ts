import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APP_CONFIG } from 'src/app/config';
import { Samples } from 'src/app/models/samples.model';
import { AppConfig } from 'src/app/shared/models/app-config/app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class SamplesService {
  samples: Samples[] = [];
  sampleUpdate = new Subject<Samples[]>();

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) { }

  getSamples(){
    this.http.get<{message: string, samples: Samples[], comments: any}>(`${this.appConfig.apiUrls.sampleUrl.getsamples}`)
    .subscribe((sampleData) => {
      this.samples = sampleData.samples;
      this.sampleUpdate.next([...this.samples]);
    })
  }
  editSamples(samples){
    this.http.post<{message: string}>(`${this.appConfig.apiUrls.sampleUrl.editsamples}`, samples)
    .subscribe(res => {
      console.log(res.message);
      this.samples.push(samples);
      this.sampleUpdate.next([...this.samples]);
    })
  }
  addSamples(samples){
    this.http.post<{message: string}>(`${this.appConfig.apiUrls.sampleUrl.getsamples}`, samples)
    .subscribe(res => {
      console.log(res.message);
      this.samples.push(samples);
      this.sampleUpdate.next([...this.samples]);
    })
  }
  saveSiteComments(commentsDTO: Samples): Observable<any> {
    return this.http.post<any>(``, commentsDTO);
  }
  editSample(commentsDTO: Samples): Observable<any> {
    return this.http.post<any>(`${this.appConfig.apiUrls.sampleUrl.editsamples}`, commentsDTO);
  }

  getSamplesUpdated(){
    return this.sampleUpdate.asObservable();
  }
}
