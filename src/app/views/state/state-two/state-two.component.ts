import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { UserDataService } from '@app/services/user.data.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-state-two',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './state-two.component.html',
  styleUrls: ['./state-two.component.scss']
})
export class StateTwoComponent implements OnInit {

  userDataService = inject(UserDataService);

  constructor() {

  }

  ngOnInit(): void {

  }

  

}
