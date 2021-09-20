import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SampleDetails } from 'src/app/models/samples';
import { Samples } from 'src/app/models/samples.model';

@Component({
  selector: 'app-view-sample',
  templateUrl: './view-sample.component.html',
  styleUrls: ['./view-sample.component.css']
})
export class ViewSampleComponent implements OnInit {
  sampleGuid: string;
  sampleId: string;
  loaded: boolean;
  loading: boolean;
  metadata: any;
  constructor(private route: ActivatedRoute) {
    debugger;
    this.route.queryParams.subscribe(params => { this.sampleId = params.id || ''; });
    this.route.queryParams.subscribe(params => { this.sampleGuid = params.sampleGuid || ''; });
    this.route.queryParams.subscribe(params => { this.metadata = params; });

   }

  ngOnInit(): void {
    console.log(JSON.stringify(this.metadata),'meta')
  }

  refresh() {
    this.loaded = false;
    setTimeout(() => { this.loaded = true; this.getSampleDetails(this.sampleGuid); }, 0);
  }
  getSampleDetails(sampleGuid: string) {
    this.loading = true;
        // this.samplesService.getSampleDetails(sampleGuid).subscribe(
        //   (data: SampleDetails) => {
        //     if (data) {
        //       this.sampleDetails = data;

        //       this.buildSampleGrid(this.sampleDetails.sampleId);
        // this.isLoading = false;

        //     }
        //   }, (error) => {
        //   });
      }
}
