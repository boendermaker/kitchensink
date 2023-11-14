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

  rndNumber(): number {
    return Math.floor(Math.random()*10);
  }

}
