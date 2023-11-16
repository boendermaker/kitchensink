import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizabletablecolumnComponent } from './resizabletablecolumn.component';
import { ResizeDirective } from '@app/directives/resize.directive';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ResizeComponent } from '../../directives/resize.component';

@NgModule({
  declarations: [
    ResizabletablecolumnComponent,
    ResizeDirective
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    ResizeComponent
  ],
  exports: [
    ResizabletablecolumnComponent
  ]
})
export class ResizabletablecolumnModule { }
