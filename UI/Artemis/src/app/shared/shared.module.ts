import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NameFormatPipe } from './pipes/name-format.pipe';
import { AsideComponent } from './components/aside/aside.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    NameFormatPipe,
    AsideComponent
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
    AsideComponent
  ]
})
export class SharedModule { }
