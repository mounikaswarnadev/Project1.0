import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ViewSampleComponent } from './modules/view-sample/view-sample.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    // pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path:'viewsample', component: ViewSampleComponent
  },
  {
    path: "**",
    redirectTo: 'home',
    // pathMatch: 'full'
    // canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
