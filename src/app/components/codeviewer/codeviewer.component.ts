import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
  selector: 'app-codeviewer',
  templateUrl: './codeviewer.component.html',
  styleUrls: ['./codeviewer.component.scss'],
})
export class CodeviewerComponent implements OnInit {

  _code: string = '';

  @Input() height: number = 500;
  /*@Input() set code(value) {
    this._code = value;
  };*/

  constructor() {
  }

  ngOnInit(): void {
    console.log();
  }


}
