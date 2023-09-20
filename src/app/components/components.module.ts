import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DrawermodaldialogModule } from '@app/components/drawermodaldialog/drawermodaldialog.module';
import { CodeviewerModule } from './codeviewer/codeviewer.module';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    DrawermodaldialogModule,
    CodeviewerModule,
    DashboardModule
  ],
  exports: [
    DrawermodaldialogModule,
    CodeviewerModule,
    DashboardModule
  ]
})
export class ComponentsModule { }
