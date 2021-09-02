import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesService } from './services/samples.service';
import { HttpClientModule } from '@angular/common/http';
import { UtilityService } from './services/utility/utility.service';
import { UsercontextService } from './services/user-context/usercontext.service';
import { ToastService } from './services/toast/toast.service';
import { INTERCEPTORS } from './interceptors';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SamplesService,
    UtilityService,
    ToastService,
    // INTERCEPTORS,
    UtilityService,
    UsercontextService
  ]
})
export class CoreModule { }
