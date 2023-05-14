import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualscrollComponent } from './virtualscroll.component';
import { MaterialModule } from '../../material.module';



@NgModule({
  declarations: [
    VirtualscrollComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class VirtualscrollModule { }
