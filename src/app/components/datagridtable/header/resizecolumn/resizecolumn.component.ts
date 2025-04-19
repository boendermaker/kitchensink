import { AfterContentInit, Component, ElementRef, Inject, Input, Optional } from '@angular/core';
import { DatagridTableHeaderComponent } from '../header.component';
import { distinctUntilChanged, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-datagridtable-resizecolumn',
  standalone: true,
  imports: [],
  templateUrl: './resizecolumn.component.html',
  styleUrl: './resizecolumn.component.scss'
})
export class DatagridTableResizeColumnComponent implements AfterContentInit {

  hidden: boolean = false;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private documentRef: Document,
    @Optional() private datagridTableHeaderComponentRef: DatagridTableHeaderComponent
  ) {
  }

  ngAfterViewInit(): void {
    this.handleColumnResize();
  }

  ngAfterContentInit() {
    //console.log('RESIZE ', this.elementRef.nativeElement);
  }

  handleColumnResize(): void {

    const tableHeaderElement = this.datagridTableHeaderComponentRef.getElementRef().nativeElement;
    const tableHeaderHandleElement = tableHeaderElement.querySelector('#resizecolumnhandle');

    if(tableHeaderHandleElement) {

      fromEvent<MouseEvent>(tableHeaderHandleElement, 'mousedown').pipe(
        tap((e) => e.preventDefault()),
        switchMap(() => {

          const { width, right } = tableHeaderElement
            .closest('th')!
            .getBoundingClientRect();

          return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
            map(({ clientX }) => {
              const finalWidth = width + clientX - right;
              tableHeaderElement.closest('th')!.style.width = `${finalWidth}px`;
              return finalWidth;
            }),
            distinctUntilChanged(),
            takeUntil(
              fromEvent(this.documentRef, 'mouseup').pipe(
                tap()
                )
              )
          );
        })
      ).subscribe()
    }

  }

}
