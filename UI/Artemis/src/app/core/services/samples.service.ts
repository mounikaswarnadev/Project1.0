import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommentsDTO, Samples } from 'src/app/models/samples.model';

@Injectable({
  providedIn: 'root'
})
export class SamplesService {
  samples: Samples[] = [];
  sampleUpdate = new Subject<Samples[]>();

  constructor(
    private http: HttpClient
  ) { }

  getSamples(){
    this.http.get<{message: string, samples: Samples[], comments: any}>('http://localhost:3000/api/samples')
    .subscribe((sampleData) => {
      this.samples = sampleData.samples;
      this.sampleUpdate.next([...this.samples]);
    })
  }

  addSamples(samples){
    this.http.post<{message: string}>('http://localhost:3000/api/samples', samples)
    .subscribe(res => {
      console.log(res.message);
      this.samples.push(samples);
      this.sampleUpdate.next([...this.samples]);
    })
  }
  saveSiteComments(commentsDTO: Samples): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/samples', commentsDTO);
  }

  getSamplesUpdated(){
    return this.sampleUpdate.asObservable();
  }
}
