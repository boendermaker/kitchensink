import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialtimepickerComponent } from './dialtimepicker.component';



@NgModule({
  declarations: [
    DialtimepickerComponent
  ],
  exports: [
    DialtimepickerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DialtimepickerModule { }
