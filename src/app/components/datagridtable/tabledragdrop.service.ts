import { DragDrop, DragRef, DragRefConfig, DropListOrientation, DropListRef } from '@angular/cdk/drag-drop';
import { ElementRef, Injectable } from '@angular/core';

/**
 * Service to handle drag and drop functionality in a table
 *
 * @example
 * Usage:
 *
 * Add table reference to the service
 * setTableRef(this.tableRef);
 *
 * Add tableheaders to the dropzone and make them draggable
 * handleDragDrop('dropzone', 'thead', 'header', 'th', 'horizontal', '[headerdraghandle]');
 *
 * Add tablerows to the rowdropzone and make them draggable
 * handleDragDrop('rowdropzone', 'tbody', 'row', 'tbody>tr', 'vertical');
 *
 * Listen to dropped events and update the dragdrop state
 *
 * handleDropped(): void {
 *   this.tableDragDropService.dropLists['dropzone'].dropped
 *   .subscribe((a) => {
 *     if(a.isPointerOverContainer) {
 *       moveItemInArray(this.columns, a.previousIndex, a.currentIndex);
 *       this.cdr.detectChanges();
 *       this.tableDragDropService.updateChanges('dropzone', 'header', 'th', '[headerdraghandle]');
 *       this.tableDragDropService.updateChanges('rowdropzone', 'row', 'tbody>tr');
 *       this.table.renderRows();
 *     }
 *   });
 *
 *   this.tableDragDropService.dropLists['rowdropzone'].dropped
 *   .subscribe((a) => {
 *     if(a.isPointerOverContainer) {
 *       moveItemInArray(this.dataSource, a.previousIndex, a.currentIndex);
 *       this.table.renderRows();
 *     }
 *   });
 * }
 * </pre>
 */

@Injectable({
  providedIn: 'root'
})
export class TableDragDropService {

  dropLists: {[p:string]: DropListRef} = {};
  draggables: {[p:string]: DragRef[]} = {};
  tableRef: ElementRef;
  dragSortColumns: boolean = false;
  dragSortRows: boolean = false;
  resizeColumns: boolean = false;

  constructor(private dragDrop: DragDrop) { }

//###########################

  addDropList(name: string, el: ElementRef): void {
    this.dropLists[name] = this.dragDrop.createDropList(el);
  }

//###########################

  addDraggable(name: string, el: ElementRef<HTMLElement> | HTMLElement, dragHandle?: ElementRef<HTMLElement> | HTMLElement, cfg?: DragRefConfig): void {
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

  setTableRef(tableRef: ElementRef): void {
    this.tableRef = tableRef;
  }

//###########################
/**
 * Setup draggable elements in a table reference
 *
 * @param dropListName - Unique name to save droplist reference in droplists dictionary
 * @param dropListSelector - CSS selector to select a droplist in the table
 * @param draggablesName - Unique name to save draggables reference in draggable dictionary
 * @param draggablesSelector - CSS selector to select draggables in the table
 * @param orientation - Droplist orientation 'horizontal' or 'vertical'
 * @param dragHandleSelector - CSS selector of the drag handle in draggable element
 */
  handleDragDrop(dropListName: string, dropListSelector: string, draggablesName: string, draggablesSelector: string, orientation: DropListOrientation, dragHandleSelector?: string): void {

    this.addDropList(dropListName, this.tableRef.nativeElement.querySelector(dropListSelector));
    this.dropLists[dropListName].withOrientation(orientation);

    this.tableRef.nativeElement.querySelectorAll(draggablesSelector).forEach((draggableItem) => {
      this.addDraggable(draggablesName, draggableItem, dragHandleSelector ? draggableItem.querySelector(dragHandleSelector) : null);
    })

    this.connectDraggablesToDropList(draggablesName, dropListName);
  }

//###########################
/**
 * Update state of all draggable elements in a dropzone
 *
 * @param dropList
 * @param draggablesName
 * @param draggableSelector
 * @param dragHandleSelector
 */
  updateChanges(dropList: string, draggablesName: string, draggableSelector: string, dragHandleSelector?: string): void {
    this.draggables[draggablesName] = [];

    this.tableRef.nativeElement.querySelectorAll(draggableSelector).forEach((draggableElement, index) => {
        this.addDraggable(draggablesName, draggableElement, dragHandleSelector ? draggableElement.querySelector(dragHandleSelector) : null);
    })

    this.connectDraggablesToDropList(draggablesName, dropList);
  }

//###########################

  resetAll(): void {
    this.resetAllDraggables();
    this.resetAllDropLists();
  }

//###########################

  resetAllDraggables(): void {
    this.draggables = {};
  }

//###########################

  resetAllDropLists(): void {
    this.dropLists = {};
  }

//###########################

}
