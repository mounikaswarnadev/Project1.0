import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NameFormatPipe } from './pipes/name-format.pipe';
import { AsideComponent } from './components/aside/aside.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { MultiCheckFilterComponent } from './components/multicheck-filter/multicheck-filter.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NameFormatPipe,
    AsideComponent,
    ToastComponent,
    MultiCheckFilterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule

  ],
  exports:[
    HeaderComponent,
    NameFormatPipe,
    AsideComponent,
    ToastComponent,
    MultiCheckFilterComponent
  ]
})
export class SharedModule { }
