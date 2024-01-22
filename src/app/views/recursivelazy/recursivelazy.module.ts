import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecursiveLazyComponent } from './recursivelazy.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';



@NgModule({
  declarations: [
    RecursiveLazyComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class RecursiveLazyModule { }
