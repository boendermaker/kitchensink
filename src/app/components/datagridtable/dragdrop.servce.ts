import { DragDrop, DragRef, DragRefConfig, DropListRef } from '@angular/cdk/drag-drop';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragDropTableService {

  dropLists: {[p:string]: DropListRef} = {};
  draggables: {[p:string]: DragRef[]} = {};
  previousIndex: number;
  currentIndex: number;

  constructor(private dragDrop: DragDrop) { }

//###########################

  addDropList(name: string, el: ElementRef): void {
    this.dropLists[name] = this.dragDrop.createDropList(el);
  }

//###########################

  addDropListGroup(name: string, el: ElementRef): void {
    this.dropLists[name] = this.dragDrop.createDropList(el);
  }

//###########################

  addDraggable(name: string, el: ElementRef, dragHandle?: ElementRef, cfg?: DragRefConfig): void {
    if(!Array.isArray(this.draggables[name])) {
      this.draggables[name] = [];
    }

    const draggable = this.dragDrop.createDrag(el, cfg);

    if(dragHandle) {
      this.draggables[name].push(draggable.withHandles([dragHandle]));
    }else {
      this.draggables[name].push(draggable);
    }

  }

//###########################

  connectDraggablesToDropList(draggables: string, droplist: string): void {
    this.dropLists[droplist].withItems(this.draggables[draggables]);
  }

//###########################

  resetDraggables(): void {
    this.draggables = {};
  }

//###########################

}
