import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { IResizableTableColumnDirectiveChangedEvent } from "./resizetablecolumn.directive";

@Component({
  selector: 'th[resizetablecolumn]',
  standalone: true,
  styleUrls: ['./resizetablecolumn.component.scss'],
  templateUrl: './resizetablecolumn.component.html',
})
export class ResizeTableColumnComponent {

  constructor() {}

}
