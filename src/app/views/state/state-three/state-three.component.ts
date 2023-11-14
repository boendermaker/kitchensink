import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { UserDataService } from '@app/services/user.data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-state-three',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './state-three.component.html',
  styleUrls: ['./state-three.component.scss']
})
export class StateThreeComponent implements OnInit {

  userDataService = inject(UserDataService);
  userCount: number = 0;

  constructor() {

  }

  ngOnInit(): void {
    this.handleStateChanged();
  }

  handleStateChanged(): void {
    this.userDataService.stateChanged_.pipe(untilDestroyed(this)).subscribe({
      next: () => {
        console.log('CHANGED');
        this.userCount = this.userDataService.getUserCount();
      }
    })
  }

}
