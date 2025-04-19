import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, forwardRef, Inject, Optional, QueryList, Renderer2, signal, ViewChild, ViewChildren, WritableSignal } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../datagridtable.service';
import { DatagridTableColumnComponent } from '../column/column.component';

@Component({
  selector: 'app-datagridtable-header',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class DatagridTableHeaderComponent implements AfterViewInit, AfterContentInit {

  @ViewChild('columnfilter') columnFilterElement!: ElementRef<HTMLDivElement>;

  columnName: string = '';
  tableHeaderElement: HTMLElement;
  tableHeaderHandleElement: HTMLElement;
  columnWidth: number = 0;
  isLastHeader: WritableSignal<boolean> = signal(false);

  constructor(
    @Inject(DOCUMENT) public documentRef: Document,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public datagridTableService: DatagridTableService,
    @Optional() public datagridTableColumnComponentRef: DatagridTableColumnComponent,
  ) {

  }

  ngOnInit(): void {
    this.getColumnName();
  }

  ngAfterViewInit(): void {
    this.removeColumnFilters();
  }

  ngAfterContentInit(): void {
  }

  //################################################

  getElementRef(): ElementRef<HTMLElement> {
    return this.elementRef;
  }

  //################################################

  getColumnName(): void {
    this.columnName = this.datagridTableColumnComponentRef.getColumnName();
  }

  //################################################

  removeColumnFilters(): void {
    const columnFilterElement = this.columnFilterElement.nativeElement;

    while (columnFilterElement.childNodes.length > 1) {
      columnFilterElement.removeChild(columnFilterElement.lastChild);
    }
  }

  //################################################



  //################################################

}
