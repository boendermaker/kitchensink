import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DrawermodaldialogModule } from '@app/components/drawermodaldialog/drawermodaldialog.module';
import { CodeviewerModule } from './codeviewer/codeviewer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TableformgroupModule } from './tableformgroup/tableformgroup.module';
import { ClocktimepickerComponent } from './clocktimepicker/clocktimepicker.component';


@NgModule({
  declarations: [
    ClocktimepickerComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    DrawermodaldialogModule,
    CodeviewerModule
  ],
  exports: [
    DrawermodaldialogModule,
    CodeviewerModule,
    DashboardModule,
    TableformgroupModule
  ]
})
export class ComponentsModule { }
