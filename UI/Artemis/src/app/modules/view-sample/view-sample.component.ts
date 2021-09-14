import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-sample',
  templateUrl: './view-sample.component.html',
  styleUrls: ['./view-sample.component.css']
})
export class ViewSampleComponent implements OnInit {
  sampleGuid: string;
  sampleId: string;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.sampleId = params.id || ''; });
    this.route.queryParams.subscribe(params => { this.sampleGuid = params.sampleGuid || ''; });
   }

  ngOnInit(): void {
  }

}
