import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { DatagridTableService } from '../../../datagridtable.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@app/directives/clickoutsidedirective/clickoutside.directive';
import { IDatagridTableColumnFilterComponent } from '@app/components/datagridtable/interfaces/columnfiltercomponent.interface';
import { DatagridTableColumnComponent } from '@app/components/datagridtable/column/column.component';
import { IDatagridTableColumnFilter } from '@app/components/datagridtable/interfaces/columnfilter.inteface';
import { EDatagridTableStateChangeEvents } from '@app/components/datagridtable/interfaces/statechangetypes.enum';
import { DatagridTableStringfilterModel } from './stringfilter.model';
import { DatagridTableColumnFilterValueModel } from '../filtervalue.model';
import { DatagridTableBaseColumnFilterModel } from '../basecolumnfilter.model';

@Component({
  selector: 'app-datagridtable-columnfilter-string',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule, ClickOutsideDirective],
  templateUrl: './stringcolumnfilter.component.html',
  styleUrl: './stringcolumnfilter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridTableStringfilterComponent implements IDatagridTableColumnFilterComponent, OnInit, OnDestroy, AfterViewInit {

  @ViewChild('detail', {static: true}) detailElement: ElementRef<HTMLDetailsElement> | undefined;
  @ViewChild('content', {static: true}) columnFilterElement: ElementRef<HTMLDetailsElement> | undefined;
  @Input() propPath: string[] = [];

  columnName: string = '';
  filterControl: FormControl<string> = new FormControl<string>('');

  constructor(
    private datagridTableService: DatagridTableService,
    @Optional() public datagridTableColumnComponentRef: DatagridTableColumnComponent,
  ) {
  }

  ngOnInit() {
    this.columnName = this.datagridTableColumnComponentRef.getColumnName();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    console.log(
      'DESTROYED'
    )
  }


//###########################

  init(): void {
    const filterObj: DatagridTableBaseColumnFilterModel = this.datagridTableService.getFilter(this.columnName);

    if (filterObj) {
      this.filterControl.patchValue(<string>filterObj.filterValues[0].value);
    }else {
      this.addFilter();
    }

  }

//###########################

  addFilter(): void {
    const filterValues: DatagridTableColumnFilterValueModel[] = [new DatagridTableColumnFilterValueModel(this.filterControl.value)];
    const filterObj: DatagridTableStringfilterModel = new DatagridTableStringfilterModel(this.columnName, this.propPath, filterValues);

    this.datagridTableService.addFilter(this.columnName, filterObj);
  }

//###########################

  updateFilter(): void {
    const filterValues: DatagridTableColumnFilterValueModel[] = [new DatagridTableColumnFilterValueModel(this.filterControl.value)];
    const filterObj: DatagridTableStringfilterModel = new DatagridTableStringfilterModel(this.columnName, this.propPath, filterValues);

    this.datagridTableService.updateFilter(this.columnName, filterObj);

    this.datagridTableService.triggerEvent(EDatagridTableStateChangeEvents.CHANGE_COLUMN_FILTER_UPDATE);
  }

//###########################

  resetFilter(): void {
    this.datagridTableService.triggerEvent(EDatagridTableStateChangeEvents.CHANGE_COLUMN_FILTER_RESET);
    this.filterControl.setValue('');
    this.datagridTableService.resetFilter(this.columnName);
  }

//###########################

  closeFilter(): void {
    this.detailElement?.nativeElement.toggleAttribute('open', false);
  }


//###########################

  tester(): void {
    console.log('TESTER', 
      this.datagridTableService.getFilter(this.columnName).getMongoDbFilterObj()
    );
  }

//###########################

//###########################

//###########################

}
