import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule, AllAngularMaterialMDCModulesModule, ReactiveFormsModule
  ]
})
export class MultilanguageformModule { }
