import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawermodalComponent } from './drawermodal.component';
import { AllAngularMaterialMDCModulesModule } from '../../shared/modules/allmaterial/allmaterial.module';


@NgModule({
  declarations: [
    DrawermodalComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class DrawermodalModule { }
