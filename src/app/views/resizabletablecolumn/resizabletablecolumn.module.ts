import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizabletablecolumnComponent } from './resizabletablecolumn.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ResizeTableColumnComponent } from '../../directives/resizetablecolumndirective/resizetablecolumn.component';
import { ResizeTableColumnDirective } from '@app/directives/resizetablecolumndirective/resizetablecolumn.directive';
import { ResizeFlexTableColumnComponent } from '../../directives/resizeflextablecolumndirective/resizeflextablecolumn.component';
import { ResizeFlexTableColumnDirective } from '@app/directives/resizeflextablecolumndirective/resizeflextablecolumn.directive';

@NgModule({
  declarations: [
    ResizabletablecolumnComponent,
    ResizeTableColumnDirective,
    ResizeFlexTableColumnDirective
  ],
  imports: [
    CommonModule,
    ResizeTableColumnComponent,
    ResizeFlexTableColumnComponent,
    AllAngularMaterialMDCModulesModule
  ],
  exports: [
    ResizeTableColumnComponent,
    ResizeFlexTableColumnComponent
  ]
})
export class ResizabletablecolumnModule { }
