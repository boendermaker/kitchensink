import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export interface IResizableTableColumnDirectiveChangedEvent {
  el: HTMLElement,
  resizedTo: number
}

@Directive({
  selector: '[resizetablecolumn]',
})
export class ResizeTableColumnDirective implements AfterViewInit {
  @Input() resizetablecolumnid: string;
  @Output() resizetablecolumnchanged: EventEmitter<IResizableTableColumnDirectiveChangedEvent> = new EventEmitter();

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

    fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown').pipe(
      tap((e) => e.preventDefault()),
      switchMap(() => {
  
        const { width, right } = this.elementRef.nativeElement
          .closest('th')!
          .getBoundingClientRect();
  
        return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
          map(({ clientX }) => { 
            const finalWidth = width + clientX - right;
            this.columnWidth = finalWidth;
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
        this.resizetablecolumnchanged.emit({el: this.elementRef.nativeElement, resizedTo: width});
      }
    })

  }

  setTableColumnWidth(width: number): void {
    this.elementRef.nativeElement.style.width = width + 'px';
  }
  
  saveColumnWidth(): void {
    const width = Math.floor(this.elementRef.nativeElement.getBoundingClientRect().width);
    if(this.columnId) {
      localStorage.setItem(`${this.columnId}`, JSON.stringify(width));
    }
  }

  restoreColumnWidth(): void {
    if(this.columnId !== undefined) {
      const width = JSON.parse(localStorage.getItem(this.columnId));
      this.elementRef.nativeElement.style.width = width + 'px';
    }
  }

}


