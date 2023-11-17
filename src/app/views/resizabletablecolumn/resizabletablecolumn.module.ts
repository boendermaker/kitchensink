import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizabletablecolumnComponent } from './resizabletablecolumn.component';
import { ResizeTableColumnDirective } from '@app/directives/resizetablecolumn.directive';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ResizeTableColumnComponent } from '../../directives/resizetablecolumn.component';

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
