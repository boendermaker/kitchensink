import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VirtualkeyboardComponent } from './virtualkeyboard.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { KioskboardComponent } from "../../components/kioskboard/kioskboard.component";



@NgModule({
    declarations: [
        VirtualkeyboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AllAngularMaterialMDCModulesModule,
        KioskboardComponent
    ]
})
export class VirtualkeyboardModule { }
