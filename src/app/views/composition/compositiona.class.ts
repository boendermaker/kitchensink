import { Component } from "@angular/core";
import { CompositionComponent } from "./composition.component";

export class CompositionClassA {

  _ref: CompositionComponent;

  constructor(_ref: CompositionComponent) {
    this._ref = _ref;
  }

  onInit(): void {
    console.log('AFTER VIEW INIT CALLED');
    this.runPrivateFunctionFromComponent();
  }

  afterViewInit(): void {
    console.log('AFTER VIEW INIT')
  }

  afterContentInit(): void {
    console.log('AFTER CONTENT INIT CALLED');
  }

  countUp(): void {
    this._ref.demoPropC++;
  }

  render(): void {
    setInterval(() => {
      this._ref.demoPropA++;
    }, 1000)
  }

  runPrivateFunctionFromComponent(): void {
    const privateFunction = this._ref.getPrivateFunction();
    privateFunction('Private called');
  }

}
