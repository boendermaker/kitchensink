import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { DrawermodaldialogModule } from '@app/components/drawermodaldialog/drawermodaldialog.module';
import { MultidimensionalViewModule } from '@app/components/multidimensional-view/multidimensional-view.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    DrawermodaldialogModule,
    MultidimensionalViewModule
  ],
  exports: [
    DrawermodaldialogModule,
    MultidimensionalViewModule
  ]
})
export class ComponentsModule { }
