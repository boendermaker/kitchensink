import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterdashboardComponent } from './gridsterdashboard.component';
import { DashboardModule } from '@app/components/dashboard/dashboard.module';



@NgModule({
  declarations: [
    GridsterdashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardModule
  ]
})
export class GridsterdashboardModule { }
