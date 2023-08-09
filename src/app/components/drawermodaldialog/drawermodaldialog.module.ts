import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawermodaldialogComponent } from './drawermodaldialog.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';



@NgModule({
  declarations: [
    DrawermodaldialogComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class DrawermodaldialogModule { }
