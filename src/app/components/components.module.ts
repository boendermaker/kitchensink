import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { DrawermodaldialogModule } from '@app/components/drawermodaldialog/drawermodaldialog.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    DrawermodaldialogModule
  ],
  exports: [
    DrawermodaldialogModule,
  ]
})
export class ComponentsModule { }
