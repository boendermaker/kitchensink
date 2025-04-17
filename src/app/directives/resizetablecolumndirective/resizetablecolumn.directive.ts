import { DOCUMENT } from '@angular/common';
import { AfterContentInit, AfterViewInit, ContentChildren, Directive, ElementRef, EventEmitter, Inject, Input, Output, QueryList } from '@angular/core';
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface IResizableTableColumnDirectiveChangedEvent {
  el: HTMLElement,
  resizedTo: number
}

/**
 * **Directive to resize a table column by dragging
 * <ul>
 * <li>Import resizetablecolumn.component from directives folder which replaces all <th resizetablecolumn> with itself.
 * <li>Import the directive resizetablecolumn.directive
 * <li>Add the attribute [resizetablecolumn] to all <th> you want to resize by dragging
 * <li>For saving the column width to localstorage add [resizetablecolumn="your applicationwide unique tablecolumn identifier"] instead
 * </ul>
 */

@UntilDestroy()
@Directive({
  selector: '[resizetablecolumn]',
  standalone: false,
})
export class ResizeTableColumnDirective implements AfterViewInit {
  @Output() resizetablecolumnchanged: EventEmitter<IResizableTableColumnDirectiveChangedEvent> = new EventEmitter();

  tableColumnElement: HTMLElement;
  tableColumnHandleElement: HTMLElement;
  columnWidth: number = 0;
  columnId: string = '';

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>
  ) {
  }

  ngOnInit(): void {
    this.columnId = this.elementRef.nativeElement.getAttribute('resizetablecolumn');
    this.restoreColumnWidth();
  }

  ngAfterViewInit(): void {

    this.tableColumnElement = this.elementRef.nativeElement;
    this.tableColumnHandleElement = this.elementRef.nativeElement.querySelector('#resizetablecolumnhandle');

    fromEvent<MouseEvent>(this.tableColumnHandleElement, 'mousedown').pipe(
      tap((e) => e.preventDefault()),
      switchMap(() => {

        const { width, right } = this.tableColumnElement
          .closest('th')!
          .getBoundingClientRect();

        return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
          map(({ clientX }) => {
            const finalWidth = width + clientX - right;
            this.columnWidth = finalWidth;
            this.setTableColumnWidth(finalWidth);
            return finalWidth;
          }),
          distinctUntilChanged(),
          takeUntil(
            fromEvent(this.documentRef, 'mouseup').pipe(
              tap((clientX) => this.saveColumnWidth())
              )
            )
        );
      })
    ).subscribe({
      next: (width) => {
        this.resizetablecolumnchanged.emit({el: this.tableColumnElement, resizedTo: width});
      }
    })

  }

  //#####################################################################

  setTableColumnWidth(width: number): void {
    this.elementRef.nativeElement.style.width = width + 'px';
  }

  //#####################################################################

  saveColumnWidth(): void {
    console.log('SAVE ', this.columnId.length)
    const width = Math.floor(this.elementRef.nativeElement.getBoundingClientRect().width);
    if(this.columnId.length > 0) {
      localStorage.setItem(`${this.columnId}`, JSON.stringify(width));
    }
  }

  //#####################################################################

  restoreColumnWidth(): void {
    console.log('RESTORE ', this.columnId.length)
    if(this.columnId.length > 0) {
      const width = JSON.parse(localStorage.getItem(this.columnId));
      this.elementRef.nativeElement.style.width = width + 'px';
    }
  }

  //#####################################################################

}


