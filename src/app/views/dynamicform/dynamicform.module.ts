import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicformComponent } from './dynamicform.component';
import { MaterialModule } from '../../material.module';



@NgModule({
  declarations: [
    DynamicformComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DynamicformModule { }
