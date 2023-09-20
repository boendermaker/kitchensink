import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { GridsterModule } from '../../../../node_modules/angular-gridster2';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    GridsterModule
  ]
})
export class DashboardModule { }
