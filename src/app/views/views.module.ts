import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { IndexModule } from './index/index.module';
import { DrawermodalModule } from './drawermodal/drawermodal.module';
import { DatatableModule } from './datatable/datatable.module';
import { VirtualscrollModule } from './virtualscroll/virtualscroll.module';
import { DynamicformModule } from './dynamicform/dynamicform.module'
import { RecursiveModule } from './recursive/recursive.module'
import { RecursiveLazyModule } from './recursivelazy/recursivelazy.module'
import { ChiplistModule } from './chiplist/chiplist.module'
import { CodeviewerModule } from '@app/components/codeviewer/codeviewer.module';


@NgModule({
  declarations: [],
  exports: [
    CodeviewerModule
  ],
  imports: [
    CommonModule,
    IndexModule,
    DrawermodalModule,
    DatatableModule,
    VirtualscrollModule,
    DynamicformModule,
    RecursiveModule,
    RecursiveLazyModule,
    ChiplistModule,
    AllAngularMaterialMDCModulesModule,
    CodeviewerModule
  ]
})
export class ViewsModule { }
