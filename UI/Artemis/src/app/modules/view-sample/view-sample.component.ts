import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SamplesService } from 'src/app/core/services/samples.service';
import { SampleDetails } from 'src/app/models/samples';
import { Comments, Samples } from 'src/app/models/samples.model';

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
  limit = 2;
  size = 2;
  isReadMore = true
  sampleDetails: SampleDetails;
  comments: Comments[];
  content: Comments[];
  constructor(private route: ActivatedRoute, private samplesService: SamplesService) {
    debugger;
    this.route.queryParams.subscribe(params => { this.sampleId = params.id || ''; });
    this.route.queryParams.subscribe(params => { this.sampleGuid = params.sampleGuid || ''; });

   }

  ngOnInit(): void {
    this.getSampleDetails(this.sampleGuid);
  }
showMore(){
  debugger;
this.limit = 10;
let size = this.size + 2;
this.comments = this.content.slice(0,size)
this.size = size;
this.isReadMore = !this.isReadMore;
}
  refresh() {
    this.loaded = false;
    setTimeout(() => { this.loaded = true; this.getSampleDetails(this.sampleGuid); }, 0);
  }
  getSampleDetails(sampleGuid: string) {
    debugger;
    this.loading = true;
    this.samplesService.getSampleDetails(sampleGuid).subscribe((data) =>{
      if(data){
        this.sampleDetails = data.samples[0];
        this.content = data.comments;
        this.size = 2
        this.comments = this.content.slice(0, this.size)
        this.loading = false;
      }
    })
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
