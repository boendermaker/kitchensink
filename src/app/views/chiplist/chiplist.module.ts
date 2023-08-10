import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChiplistComponent } from './chiplist.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CodeviewerModule } from '@app/components/codeviewer/codeviewer.module';


@NgModule({
  declarations: [
    ChiplistComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule,
    ReactiveFormsModule,
    CodeviewerModule
  ]
})
export class ChiplistModule { }
