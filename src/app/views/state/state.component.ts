import { Component, OnInit, inject } from '@angular/core';
import { UserDataService } from '@app/services/user.data.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  userDataService = inject(UserDataService);

  constructor() {

  }

  ngOnInit(): void {

  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

}
