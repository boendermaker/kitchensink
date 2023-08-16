import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';
import { AllAngularMaterialMDCModulesModule } from '../../shared/modules/allmaterial/allmaterial.module';


@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class DatatableModule { }
