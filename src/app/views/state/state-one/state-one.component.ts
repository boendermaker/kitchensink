import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { UserDataService } from '@app/services/user.data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUser } from '@app/services/user.repository.service';

@UntilDestroy()
@Component({
  selector: 'app-state-one',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './state-one.component.html',
  styleUrls: ['./state-one.component.scss']
})
export class StateOneComponent implements OnInit {

  userDataService = inject(UserDataService);
  displayedColumns: string[] = ['firstname', 'lastname', 'city', 'country', 'actions'];
  dataSource: IUser[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.handleDataSource();
  }

  handleDataSource(): void {
    this.userDataService.userState_.pipe(untilDestroyed(this)).subscribe({
      next: (users: IUser[]) => {
        this.dataSource = users;
        console.log(users)
      }
    })
  }


}
