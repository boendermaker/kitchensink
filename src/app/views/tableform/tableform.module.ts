import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableformComponent } from './tableform.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeviewerModule } from "../../components/codeviewer/codeviewer.module";



@NgModule({
    declarations: [
        TableformComponent
    ],
    imports: [
        CommonModule,
        AllAngularMaterialMDCModulesModule,
        ReactiveFormsModule,
        FormsModule,
        CodeviewerModule
    ]
})
export class TableformModule { }
