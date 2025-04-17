import { Component, OnInit, inject } from '@angular/core';
import { UserStateService } from '@app/services/state.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
  standalone: false,
})
export class StateComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

}
