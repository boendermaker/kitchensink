/* eslint-disable prettier/prettier */
import {ChangeDetectionStrategy, Component, DestroyRef, inject, Optional} from '@angular/core';
import { DatagridTableService } from '../../../datagridtable.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { DatagridTableColumnFilterValueModel } from '../filtervalue.model';
import {DatagridTableBaseColumnFilterComponent} from '../basefilter.component';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableBaseColumnFilterModel } from '../basecolumnfilter.model';
import { DatagridTableColumnComponent } from '@app/components/datagridtable/column/column.component';
import { DatagridTableDateColumnFilterModel } from './datefilter.model';


@Component({
  selector: 'app-datagridtable-columnfilter-date',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './datecolumnfilter.component.html',
  styleUrl: './datecolumnfilter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridTableDatefilterComponent extends DatagridTableBaseColumnFilterComponent {
  destroyRef: DestroyRef = inject(DestroyRef);

  filterObj: DatagridTableBaseColumnFilterModel;
  formGroup: FormGroup;

  constructor(
    protected datagridTableService: DatagridTableService,
    private fb: FormBuilder,
    @Optional() public datagridTableColumnComponentRef: DatagridTableColumnComponent
  ) {
    super(datagridTableService, datagridTableColumnComponentRef);
    this.createFormGroup();
  }

  //###########################

  init(): void {
    const existingFilterObj = this.datagridTableService.getFilter(this.columnName);

    if(existingFilterObj) {
      this.filterObj = existingFilterObj;
    }else if(this.customFilterModel) {
      this.filterObj = this.customFilterModel;
    }else {
      this.filterObj = new DatagridTableDateColumnFilterModel();
    }

    if (this.filterObj && Array.isArray(this.filterObj?.filterValues) && this.filterObj?.filterValues?.length > 0) {
      this.formGroup.patchValue(this.getFilterValues());
    }else {
      this.updateFilter([new DatagridTableColumnFilterValueModel('')]);
    }
  }

//###########################

  filterChange(): void {
    this.updateFilter(this.buildFilterValues());
  }

//###########################

  resetChange(): void {
    this.formGroup.patchValue({
      fromDate: null,
      toDate: null,
      fromTime: undefined,
      toTime: undefined
    });
    this.formGroup.updateValueAndValidity();
    this.resetFilter();
  }

//###########################

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      fromDate: this.fb.control<Date|null>(null),
      toDate: this.fb.control<Date|null>(null),
      fromTime: this.fb.control<string>(''),
      toTime: this.fb.control<string>(''),
    });
  }

//###########################

  buildFilterValues(): DatagridTableColumnFilterValueModel[] {
    const formValues = this.formGroup.getRawValue();
    return [
      new DatagridTableColumnFilterValueModel(formValues.fromDate, 'fromDate'),
      new DatagridTableColumnFilterValueModel(formValues.toDate, 'toDate'),
      new DatagridTableColumnFilterValueModel(formValues.fromTime, 'fromTime'),
      new DatagridTableColumnFilterValueModel(formValues.toTime, 'toTime'),
    ];
  }

//###########################

  getFilterValues(): { fromDate: Date | null, toDate: Date | null, fromTime: string, toTime: string } {
    return {
      fromDate: <Date>this.filterObj.filterValues.find(f => f.id === 'fromDate').value,
      toDate: <Date>this.filterObj.filterValues.find(f => f.id === 'toDate').value,
      fromTime: <string>this.filterObj.filterValues.find(f => f.id === 'fromTime').value,
      toTime: <string>this.filterObj.filterValues.find(f => f.id === 'toTime').value,
    }
  }

//###########################

}
