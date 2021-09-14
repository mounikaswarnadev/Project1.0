import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PopupModule } from "@progress/kendo-angular-popup";
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LabelModule } from '@progress/kendo-angular-label';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewSampleComponent } from '../view-sample/view-sample.component';

@NgModule({
  declarations: [
    HomeComponent,
    ViewSampleComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DropDownListModule,
    DropDownsModule,
    DialogModule,
    GridModule,
    ExcelModule,
    LabelModule,
    RouterModule,
    InputsModule,
    PopupModule,
    DateInputsModule,
    LayoutModule,
    IntlModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  exports: [
    HomeComponent,
    ViewSampleComponent
  ]
})
export class HomeModule { }
