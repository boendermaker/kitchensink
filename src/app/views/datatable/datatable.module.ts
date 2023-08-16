import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';
import { MaterialModule } from '../../material.module';


@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DatatableModule { }
