import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { DatagridTableService } from '../../../datagridtable.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@app/directives/clickoutsidedirective/clickoutside.directive';
import { IDatagridTableColumnFilterComponent } from '@app/components/datagridtable/interfaces/columnfiltercomponent.interface';
import { DatagridTableColumnComponent } from '@app/components/datagridtable/column/column.component';
import { IDatagridTableColumnFilter } from '@app/components/datagridtable/interfaces/columnfilter.inteface';
import { DatagridTableColumnDefaultFilter } from './defaultfilter.class';

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
  @Input() customFilterRef: IDatagridTableColumnFilter = null;

  filterRef: IDatagridTableColumnFilter;
  columnName: string = '';

  filterControl: FormControl<string> = new FormControl<string>('');

  constructor(
    private datagridTableService: DatagridTableService,
    @Optional() public datagridTableColumnComponentRef: DatagridTableColumnComponent,
  ) {
  }

  ngOnInit() {
    this.getColumnName();
    this.initFilter();
  }

  ngAfterViewInit(): void {
    //this.positionFilter();
    this.addFilterCallback();
  }

  ngOnDestroy(): void {
    this.resetAllFilterCallback();
  }

//###########################

  initFilter(): void {
    if(this.customFilterRef) {
      console.log( 'Custom filter ref', this.customFilterRef);
      this.filterRef = this.customFilterRef;
      this.filterRef.filterComponentRef = this;
      this.filterRef.columnName = this.columnName;
    }else {
      this.filterRef = new DatagridTableColumnDefaultFilter();
      this.filterRef.filterComponentRef = this;
      this.filterRef.columnName = this.columnName;
    }

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
    this.datagridTableService.addColumnFilterCallback(this.filterRef.filterCallBack.bind(this.filterRef));
  }

//###########################

/*  filterCallback(dataRow: unknown): boolean {
    const columnValue: string = dataRow?.[this.columnName].toString().toLowerCase();
    const filterValue: string = this.filterControl.value.toString().toLowerCase();
    return columnValue.includes(filterValue);
  }*/

//###########################

}
