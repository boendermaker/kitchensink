import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizabletablecolumnComponent } from './resizabletablecolumn.component';
import { ResizeTableColumnDirective } from '@app/directives/resizetablecolumndirective/resizetablecolumn.directive';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ResizeTableColumnComponent } from '../../directives/resizetablecolumndirective/resizetablecolumn.component';

@NgModule({
  declarations: [
    ResizabletablecolumnComponent,
    ResizeTableColumnDirective
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    ResizeTableColumnComponent
  ],
  exports: [
    ResizeTableColumnComponent
  ]
})
export class ResizabletablecolumnModule { }
