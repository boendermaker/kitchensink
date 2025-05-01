import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { DatagridTableService } from '../../../datagridtable.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@app/directives/clickoutsidedirective/clickoutside.directive';
import { IDatagridTableColumnFilterComponent } from '@app/components/datagridtable/interfaces/columnfilter.interface';
import { DatagridTableColumnComponent } from '@app/components/datagridtable/column/column.component';
import { IDatagridTableCustomColumnFilter } from '@app/components/datagridtable/interfaces/customfilter.inteface';

@Component({
  selector: 'app-datagridtable-columnfilter-string',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule, ClickOutsideDirective],
  templateUrl: './stringcolumnfilter.component.html',
  styleUrl: './stringcolumnfilter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridTableStringfilterComponent implements IDatagridTableColumnFilterComponent, OnInit, OnDestroy, AfterViewInit {

  @ViewChild('detail') detailElement: ElementRef<HTMLDetailsElement> | undefined;
  @ViewChild('content') columnFilterElement: ElementRef<HTMLDetailsElement> | undefined;

  @Input() filterClass: IDatagridTableCustomColumnFilter = null;

  columnName: string = '';
  filterControl: FormControl<string> = new FormControl<string>('');

  constructor(
    private datagridTableService: DatagridTableService,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Optional() public datagridTableColumnComponentRef: DatagridTableColumnComponent,
  ) {
  }

  ngOnInit() {
    this.getColumnName();
    this.addFilterCallback();
  }

  ngAfterViewInit(): void {
    //this.positionFilter();
  }

  ngOnDestroy(): void {
    this.resetAllFilterCallback();
  }

//###########################

  getColumnName(): void {
    this.columnName = this.datagridTableColumnComponentRef.getColumnName();
  }

//###########################

  closeFilter(): void {
    this.detailElement?.nativeElement.toggleAttribute('open', false);
  }

//###########################

  updateFilter(): void {
    this.datagridTableService.filterDataSource();
  }

//###########################

  resetFilter(): void {
    this.filterControl.setValue('');
    this.updateFilter();
  }

//###########################

  resetAllFilterCallback(): void {
    this.datagridTableService.resetAllColumnFilterCallback();
  }

//###########################

  addFilterCallback(): void {
    this.datagridTableService.addColumnFilterCallback(this.filterCallback.bind(this));
  }

//###########################

  filterCallback(dataRow: unknown): boolean {
    const columnValue: string = dataRow?.[this.columnName].toString().toLowerCase();
    const filterValue: string = this.filterControl.value.toString().toLowerCase();
    return columnValue.includes(filterValue);
  }

//###########################

}
