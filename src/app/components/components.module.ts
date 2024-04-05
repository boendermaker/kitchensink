import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DrawermodaldialogModule } from '@app/components/drawermodaldialog/drawermodaldialog.module';
import { CodeviewerModule } from './codeviewer/codeviewer.module';
import { TableformgroupModule } from './tableformgroup/tableformgroup.module';
import { GridsterModule } from '@app/components/gridster2/gridster.module'


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    DrawermodaldialogModule,
    CodeviewerModule,
    GridsterModule
  ],
  exports: [
    DrawermodaldialogModule,
    CodeviewerModule,
    TableformgroupModule,
    GridsterModule
  ]
})
export class ComponentsModule { }
