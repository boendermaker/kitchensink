import { Component, OnInit, inject } from '@angular/core';
import { UserDataService } from '@app/services/user.data.service';
import { IUser } from '../webcomponent/webcomponent.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-scrollload',
  templateUrl: './scrollload.component.html',
  styleUrls: ['./scrollload.component.scss'],
  standalone: false,
})
export class ScrollloadComponent implements OnInit {

  userDataService = inject(UserDataService);

  longList: IUser[] = [];

  constructor() {

  }

  ngOnInit(): void {
    console.log();
    this.handleDataSource();
    this.userDataService.getRandomUsers(10);
  }

  handleDataSource(): void {
    this.userDataService.userState_.pipe(untilDestroyed(this)).subscribe({
      next: (users: IUser[]) => {
        this.longList = [...this.longList, ...users];
      }
    })
  }

  onState(e): void {
    console.log('OBSERVER ', e);
    if(e.visible) {
      this.userDataService.getRandomUsers(10);
    }
  }

}
