import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { CompositionComponent } from './composition.component';
import { CodeviewerModule } from "../../components/codeviewer/codeviewer.module";



@NgModule({
    declarations: [
        CompositionComponent
    ],
    imports: [
        CommonModule,
        AllAngularMaterialMDCModulesModule,
        CodeviewerModule
    ]
})
export class CompositionModule { }
