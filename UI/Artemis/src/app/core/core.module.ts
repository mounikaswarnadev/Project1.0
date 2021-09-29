import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesService } from './services/samples.service';
import { HttpClientModule } from '@angular/common/http';
import { UtilityService } from './services/utility/utility.service';
import { UsercontextService } from './services/user-context/usercontext.service';
import { ToastService } from './services/toast/toast.service';
import { INTERCEPTORS } from './interceptors';
import { UserNavigationControlService } from './services/user-context/user.navigation-control.service';
import { CacheService } from './services/cache-service/cache.service';



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
    CacheService,
    // INTERCEPTORS,
    UtilityService,
    UsercontextService,
    UserNavigationControlService
  ]
})
export class CoreModule { }
