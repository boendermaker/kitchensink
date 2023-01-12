import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawermodalComponent } from './drawermodal.component';
import { MaterialModule } from '../../material.module';


@NgModule({
  declarations: [
    DrawermodalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DrawermodalModule { }
