import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeviewerComponent } from './codeviewer.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';



@NgModule({
  declarations: [
    CodeviewerComponent
  ],
  exports: [
    CodeviewerComponent
  ],
  imports: [
    CommonModule,
    AllAngularMaterialMDCModulesModule
  ]
})
export class CodeviewerModule { }
