import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateComponent } from './state.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { StateOneComponent } from '@app/views/state/state-one/state-one.component';
import { StateTwoComponent } from '@app/views/state/state-two/state-two.component';
import { StateThreeComponent } from '@app/views/state/state-three/state-three.component';
import { StateContainerComponent } from "./state-container/state-container.component";


@NgModule({
    declarations: [
        StateComponent
    ],
    exports: [
        StateComponent
    ],
    imports: [
        CommonModule,
        AllAngularMaterialMDCModulesModule,
        StateOneComponent,
        StateTwoComponent,
        StateThreeComponent,
        StateContainerComponent
    ]
})
export class StateModule { }
