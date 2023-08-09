import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChiplistComponent } from './chiplist.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChiplistComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    ReactiveFormsModule
  ]
})
export class ChiplistModule { }
