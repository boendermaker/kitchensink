import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DrawermodaldialogModule } from '@app/components/drawermodaldialog/drawermodaldialog.module';
import { CodeviewerModule } from './codeviewer/codeviewer.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    DrawermodaldialogModule,
    CodeviewerModule
  ],
  exports: [
    DrawermodaldialogModule,
    CodeviewerModule
  ]
})
export class ComponentsModule { }
