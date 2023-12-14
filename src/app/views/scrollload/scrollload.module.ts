import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { ScrollloadComponent } from '@app/views/scrollload/scrollload.component';
import { ObserveVisibilityDirective } from '@app/directives/intersectionobserverdirective/intersectionobserver.directive';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';



@NgModule({
  declarations: [
    ScrollloadComponent,
    ObserveVisibilityDirective
  ],
  exports: [
    CommonModule,
    ScrollloadComponent,
    ObserveVisibilityDirective,
    AllAngularMaterialMDCModulesModule
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class ScrollloadModule { }
