import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Blockly from 'blockly';
import { BlocklyOptions } from 'blockly';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.scss']
})
export class BlocklyComponent implements OnInit, AfterViewInit {

  @ViewChild('blocklycontainer') blocklyRef: ElementRef;

  blocklyDiv: HTMLElement = null;
  toolbox: BlocklyOptions = null;
  workspace: Blockly.Workspace;

  constructor() {

  }

//#########################################

  ngOnInit(): void {

    this.toolbox = <BlocklyOptions>{
      media: './assets/media/',
      kind: 'flyoutToolbox',
      contents: [
        {
          kind: 'block',
          type: 'constant_value'
        }
      ]
    };


    }

//#########################################

  ngAfterViewInit(): void {
    this.blocklyDiv = this.blocklyRef.nativeElement;

    Blockly.Blocks['constant_value'] = {
      init: function () {
        this.appendValueInput('VALUE').setCheck('String').appendField('TEST');
        this.setOutput(true, 'Number');
        this.setColour(160);
        this.setTooltip('Returns number of letters in the provided text.');
        this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
      }
    }

    this.workspace = Blockly.inject(this.blocklyDiv, <BlocklyOptions>{toolbox: this.toolbox});
  }

//#########################################


}
