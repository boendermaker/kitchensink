import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragdroptabsComponent } from './dragdroptabs.component';
import { AllAngularMaterialMDCModulesModule } from '../../shared/modules/allmaterial/allmaterial.module';



@NgModule({
  declarations: [
    DragdroptabsComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class DragdroptabsModule { }
