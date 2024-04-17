import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerangeComponent } from './timerange.component';
import { TimesliderComponent } from '@app/components/timeslider/timeslider.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TimerangeComponent,
    TimesliderComponent
  ]
})
export class TimerangeModule { }
