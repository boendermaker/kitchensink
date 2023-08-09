import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicformComponent } from './dynamicform.component';
import { AllAngularMaterialMDCModulesModule } from '../../shared/modules/allmaterial/allmaterial.module';



@NgModule({
  declarations: [
    DynamicformComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class DynamicformModule { }
