import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicformComponent } from './dynamicform.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { TableformgroupModule } from '@app/components/tableformgroup/tableformgroup.module';
import { DynamicformgroupComponent } from "../../components/dynamicformgroup/dynamicformgroup.component";


@NgModule({
    declarations: [
        DynamicformComponent
    ],
    imports: [
        CommonModule,
        AllAngularMaterialMDCModulesModule,
        ReactiveFormsModule,
        FormsModule,
        TableformgroupModule,
        DynamicformgroupComponent
    ]
})
export class DynamicformModule { }
