import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerangeComponent } from './timerange.component';
import { ValueSliderComponent } from '@app/components/valueslider/valueslider.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TimerangeComponent,
    ValueSliderComponent
  ]
})
export class TimerangeModule { }
