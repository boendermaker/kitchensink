import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentComponent } from './webcomponent.component';
import { HttpClientModule } from '@angular/common/http';
import { AllAngularMaterialMDCModulesModule } from '../../shared/modules/allmaterial/allmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import '../../../../node_modules/webcomponents/public/countbutton/';
import '../../../../node_modules/webcomponents/public/datatest/';
import '../../../../node_modules/webcomponents/public/threetest/';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    WebcomponentComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class WebcomponentModule { }
