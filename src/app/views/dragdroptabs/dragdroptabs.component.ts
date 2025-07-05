import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dragdroptabs',
  templateUrl: './dragdroptabs.component.html',
  styleUrls: ['./dragdroptabs.component.scss'],
  standalone: false,
})
export class DragdroptabsComponent implements OnInit {

  @ViewChild('tabGroup', { static: false }) childTabGroup!: MatTabGroup;

  childMenuIds$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  CHILD_ID_NAME = 'menu-name';
  tabs = new Array(15).fill(0).map((_, index) => ({Name: { Value: `Tab ${index}` } }));


  constructor() {

  }

  ngOnInit(): void {
    this.recalculateUniqIdsForDragDrop();
  }

  //####################################################################

  trackByIndex(index: number): number {
    return index;
  }

  //####################################################################

  onDropTab(event: CdkDragDrop<string[]>): void {
    const previousIndex = parseInt(event.previousContainer.id.replace(this.CHILD_ID_NAME, ''), 10);
    const newIndex = parseInt(event.container.id.replace(this.CHILD_ID_NAME, ''), 10);
    moveItemInArray(this.tabs, previousIndex, newIndex);
    this.showDragWrapper(event);
  }

  //####################################################################

  onDragEntered(event: CdkDragEnter): void {
    this.hideDragWrapper(event);
  }

  //####################################################################

  onDragExited(event: CdkDragExit): void {
    this.showDragWrapper(event);
  }

  //####################################################################

  onRemoveMenu(event: MouseEvent, index: number): void {
    event.stopPropagation();
    this.tabs.splice(index, 1);
    // When we want to remove last item and this item is active right now
    if (this.childTabGroup.selectedIndex === this.tabs.length) {
      this.childTabGroup.selectedIndex = this.childTabGroup.selectedIndex - 1;
    }
    this.recalculateUniqIdsForDragDrop();
  }

  //####################################################################

  onAddChildControl(event: MouseEvent): void {
    event.stopPropagation();
    this.tabs.push({Name: { Value: `Tab ${this.tabs.length + 1}` } });
    this.recalculateUniqIdsForDragDrop();
  }

  //####################################################################

  private showDragWrapper(event: CdkDragExit | CdkDragDrop<string[]>): void {
    const element = this.getDragWrappedElement(event);
    console.log('SHOW ', element);
    if (element) {
      element.classList.remove('d-none');
    }
  }

  //####################################################################

  private hideDragWrapper(event: CdkDragEnter): void {
    const element = this.getDragWrappedElement(event);
    console.log('HIDE ', element);
    if (element) {
      element.classList.add('d-none');
    }
  }

  //####################################################################

  private getDragWrappedElement(event: CdkDragEnter | CdkDragExit): HTMLElement | null {
    console.log(event.container.element);
    return event.container.element.nativeElement.querySelector(`.drag-wrapper`);
  }

  //####################################################################

  private recalculateUniqIdsForDragDrop(): void {
    const uniqIds: string[] = [];
    this.tabs.reduce((accumulator: string[], _, index) => {
      accumulator.push(`${this.CHILD_ID_NAME}${index}`);
      return accumulator;
    }, uniqIds);
    this.childMenuIds$.next(uniqIds);
  }

  //####################################################################

}
