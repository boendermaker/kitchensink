import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '../../shared/modules/allmaterial/allmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableformgroupComponent } from './tableformgroup.component';



@NgModule({
  declarations: [
    TableformgroupComponent
  ],
  exports: [
    TableformgroupComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    ReactiveFormsModule
  ]
})
export class TableformgroupModule { }
