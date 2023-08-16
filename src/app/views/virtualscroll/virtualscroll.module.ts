import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualscrollComponent } from './virtualscroll.component';
import { AllAngularMaterialMDCModulesModule } from '../../shared/modules/allmaterial/allmaterial.module';



@NgModule({
  declarations: [
    VirtualscrollComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class VirtualscrollModule { }
