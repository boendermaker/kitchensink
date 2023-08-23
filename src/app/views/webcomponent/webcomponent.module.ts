import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentComponent } from './webcomponent.component';
import '../../../../node_modules/webcomponents/public/countbutton/countbutton'


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    WebcomponentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WebcomponentModule { }
