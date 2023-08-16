import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChiplistComponent } from './chiplist.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CodeviewerModule } from '@app/components/codeviewer/codeviewer.module';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';


@NgModule({
  declarations: [
    ChiplistComponent,
    Form1Component,
    Form2Component
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    ReactiveFormsModule,
    CodeviewerModule
  ]
})
export class ChiplistModule { }
