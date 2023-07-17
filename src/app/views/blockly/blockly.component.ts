import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Blockly from 'Blockly/core';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.scss']
})
export class BlocklyComponent implements OnInit, AfterViewInit {

  constructor() {

  }

//#########################################

  ngOnInit(): void {
    console.log();
  }

//#########################################

  ngAfterViewInit(): void {
    console.log();
  }

//#########################################


}
