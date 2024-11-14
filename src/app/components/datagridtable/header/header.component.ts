import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, Inject, QueryList, signal, WritableSignal } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DatagridTableResizeHeaderComponent } from '@app/components/datagridtable/header/resizeheader/resizeheader.component';
import { DatagridTableColumnComponent } from '../column/column.component';

@Component({
  selector: '[datagridtableheader]',
  standalone: true,
  imports: [DatagridTableResizeHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class DatagridTableHeaderComponent implements AfterViewInit, AfterContentInit {

  @ContentChildren(DatagridTableHeaderComponent, {read: ElementRef}) header: QueryList<ElementRef>;

  tableHeaderElement: HTMLElement;
  tableHeaderHandleElement: HTMLElement;
  columnWidth: number = 0;
  columnId: string = '';
  isLastHeader: WritableSignal<boolean> = signal(false);

  constructor(
    @Inject(DOCUMENT) public documentRef: Document,
    private elementRef: ElementRef
  ) {

  }

  ngAfterViewInit(): void {
    this.handleColumnResize();
    this.isLastHeader.set(this.elementRef.nativeElement.nextSibling.tagName !== 'TH');
  }

  ngAfterContentInit(): void {

  }

  //################################################

  handleColumnResize(): void {

    this.tableHeaderElement = this.elementRef.nativeElement;
    this.tableHeaderHandleElement = this.elementRef.nativeElement.querySelector('#resizetablecolumnhandle');

    fromEvent<MouseEvent>(this.tableHeaderHandleElement, 'mousedown').pipe(
      tap((e) => e.preventDefault()),
      switchMap(() => {

        const { width, right } = this.tableHeaderElement
          .closest('th')!
          .getBoundingClientRect();

        return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
          map(({ clientX }) => {
            const finalWidth = width + clientX - right;
            this.columnWidth = finalWidth;
            this.tableHeaderElement.closest('th')!.style.width = `${finalWidth}px`;
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
    ).subscribe({
      next: (width) => {

      }
    });

  }

  //################################################

}
