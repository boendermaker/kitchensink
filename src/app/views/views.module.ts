import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexModule } from './index/index.module';
import { DrawermodalModule } from './drawermodal/drawermodal.module';
import { DatatableModule } from './datatable/datatable.module';
import { VirtualscrollModule } from './virtualscroll/virtualscroll.module';
import { MaterialModule } from '../material.module';
import { DynamicformModule } from './dynamicform/dynamicform.module'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexModule,
    DrawermodalModule,
    DatatableModule,
    VirtualscrollModule,
    DynamicformModule,
    MaterialModule
  ]
})
export class ViewsModule { }
