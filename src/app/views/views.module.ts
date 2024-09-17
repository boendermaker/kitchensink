import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { WebcomponentModule } from '@app/views/webcomponent/webcomponent.module';
import { CodeviewerModule } from '@app/components/codeviewer/codeviewer.module';
import { DragdroptabsModule } from './dragdroptabs/dragdroptabs.module';
import { GridsterdashboardModule } from './gridsterdashboard/gridsterdashboard.module';
import { StateModule } from './state/state.module';
import { ResizabletablecolumnModule } from './resizabletablecolumn/resizabletablecolumn.module';
import { ScrollloadModule } from './scrollload/scrollload.module';
import { VirtualkeyboardModule } from './virtualkeyboard/virtualkeyboard.module';
import { CompositionModule } from './composition/composition.module';
import { MultirangeSliderModule } from './multirangeslider/multirangeslider.module';
import { TableformModule } from './tableform/tableform.module';
import { ModelToFormModule } from './modeltoform/modeltoform.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    CodeviewerModule,
    WebcomponentModule,
    DragdroptabsModule,
    GridsterdashboardModule,
    StateModule,
    ResizabletablecolumnModule,
    ScrollloadModule,
    VirtualkeyboardModule,
    CompositionModule,
    MultirangeSliderModule,
    TableformModule,
    ModelToFormModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class ViewsModule { }
