import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultirangeSliderComponent } from './multirangeslider.component';
import { ValueSliderComponent } from '@app/components/valueslider/valueslider.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MultirangeSliderComponent,
    ValueSliderComponent
  ]
})
export class MultirangeSliderModule { }
