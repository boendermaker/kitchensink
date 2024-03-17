import { CompositionComponent } from "./composition.component";

export class CompositionClassB {

  _ref: CompositionComponent;

  constructor(_ref: CompositionComponent) {
    this._ref = _ref;
  }

  onInit(): void {
    console.log('AFTER VIEW INIT CALLED');
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
      this._ref.demoPropB += 2;
    }, 1000)
  }

}
