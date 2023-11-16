import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateOneComponent } from "../state-one/state-one.component";
import { StateTwoComponent } from "../state-two/state-two.component";
import { StateThreeComponent } from "../state-three/state-three.component";
import { UserDataService } from '@app/services/user.data.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';

@Component({
    selector: 'app-state-container',
    standalone: true,
    templateUrl: './state-container.component.html',
    styleUrls: ['./state-container.component.scss'],
    providers: [UserDataService],
    imports: [CommonModule, StateOneComponent, StateTwoComponent, StateThreeComponent, AllAngularMaterialMDCModulesModule]
})
export class StateContainerComponent {

  @Input() namespace: string;

  userDataService = inject(UserDataService);

  constructor() {

  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  
}
