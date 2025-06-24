import { AfterContentInit, Component, ElementRef, Inject, Input, Optional } from '@angular/core';
import { DatagridTableHeaderComponent } from '../header.component';
import { distinctUntilChanged, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DatagridTableService } from '../../datagridtable.service';

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
    private datagridTableService: DatagridTableService,
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

    const tableHeaderElement: HTMLElement = this.datagridTableHeaderComponentRef.getElementRef().nativeElement;
    const tableHeaderHandleElement = tableHeaderElement.querySelector('#resizecolumnhandle');

    if(tableHeaderHandleElement) {

      //tableHeaderElement.parentElement.style.width = '0';

      fromEvent<MouseEvent>(tableHeaderHandleElement, 'mousedown').pipe(
        tap((e) => e.preventDefault()),
        switchMap(() => {         
          const { width, right } = tableHeaderElement
            .closest('th')!
            .getBoundingClientRect();

          return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
            map(({ clientX }) => {                          
              if( tableHeaderElement?.closest('th') ) {
                const finalWidth = width + clientX - right;
                tableHeaderElement.parentElement.closest('th')!.style.width = `${finalWidth}px`;
                tableHeaderElement.parentElement.closest('th')!.style.minWidth = `${finalWidth}px`;
                return finalWidth;
              }
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
