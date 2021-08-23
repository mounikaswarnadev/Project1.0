import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesService } from './services/samples.service';
import { HttpClientModule } from '@angular/common/http';
import { UtilityService } from './services/utility/utility.service';
import { UsercontextService } from './services/user-context/usercontext.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SamplesService,
    UtilityService,
    UsercontextService
  ]
})
export class CoreModule { }
