import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, forwardRef, Inject, QueryList, signal, ViewChild, WritableSignal } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DatagridTableResizeHeaderComponent } from '@app/components/datagridtable/header/resizeheader/resizeheader.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../datagridtable.service';

@Component({
  selector: 'app-datagridtable-header',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, DatagridTableResizeHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class DatagridTableHeaderComponent implements AfterViewInit, AfterContentInit {

  tableHeaderElement: HTMLElement;
  tableHeaderHandleElement: HTMLElement;
  columnWidth: number = 0;
  columnId: number;
  currentColumn: string = '';
  isLastHeader: WritableSignal<boolean> = signal(false);

  constructor(
    @Inject(DOCUMENT) public documentRef: Document,
    private elementRef: ElementRef,
    public datagridTableService: DatagridTableService,
  ) {

  }

  ngAfterViewInit(): void {
    this.handleColumnResize();
  }

  ngAfterContentInit(): void {
    console.log('CURRENTCOLUMN ', this.currentColumn)
  }

  //################################################

  handleColumnResize(): void {

    this.tableHeaderElement = this.elementRef.nativeElement;
    this.tableHeaderHandleElement = this.elementRef.nativeElement.querySelector('#resizetablecolumnhandle');

    if(this.datagridTableService?.state?.resizeColumns) {

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

  }

  //################################################

}
