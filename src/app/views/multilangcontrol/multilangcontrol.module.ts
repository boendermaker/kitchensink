import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultilangControlComponent } from './multilangcontrol.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { MatFormFieldControl } from '@angular/material/form-field';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MultilangControlComponent
  ]
})
export class MultilangControlModule { }
