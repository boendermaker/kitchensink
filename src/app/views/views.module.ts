import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawermodalModule } from './drawermodal/drawermodal.module';
import { DatatableModule } from './datatable/datatable.module';
import { MaterialModule } from '../material.module';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DrawermodalModule,
    DatatableModule,
    MaterialModule,
    ScrollingModule
  ]
})
export class ViewsModule { }
