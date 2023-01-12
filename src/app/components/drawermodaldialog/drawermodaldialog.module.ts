import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawermodaldialogComponent } from './drawermodaldialog.component';
import { MaterialModule } from '@app/material.module';



@NgModule({
  declarations: [
    DrawermodaldialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DrawermodaldialogModule { }
