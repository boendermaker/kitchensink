import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeTableColumnComponent } from '@app/directives/resizetablecolumndirective/resizetablecolumn.component';
import { ResizeTableColumnDirective } from '@app/directives/resizetablecolumndirective/resizetablecolumn.directive';


@NgModule({
  declarations: [
    ResizeTableColumnDirective,
  ],
  imports: [
    CommonModule,
    ResizeTableColumnComponent,
  ],
  exports: [
    ResizeTableColumnComponent
  ]
})
export class ResizeTableColumDirectiveModule { }
