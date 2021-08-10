import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: "**",
    redirectTo: 'home',
    pathMatch: 'full'
    // canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    initialNavigation: false
  })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
