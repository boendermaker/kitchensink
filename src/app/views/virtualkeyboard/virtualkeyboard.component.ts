import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KioskboardService } from '@app/components/kioskboard/kioskboard.service';

@Component({
  selector: 'app-virtualkeyboard',
  templateUrl: './virtualkeyboard.component.html',
  styleUrls: ['./virtualkeyboard.component.scss'],
  standalone: false,
})
export class VirtualkeyboardComponent implements OnInit {

  testControl: FormControl = new FormControl('');

  testFormgroup: FormGroup = new FormGroup({
    test1Control: new FormControl(''),
    test2Control: new FormControl('')
  })

  constructor(
    public kioskboardService: KioskboardService
  ) {
  }

  ngOnInit(): void {
    console.log();
  }

}
