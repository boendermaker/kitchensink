import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableformComponent } from './tableform.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableformComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TableformModule { }
