/* eslint-disable prettier/prettier */
import { ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableBaseColumnFilterComponent } from '../basefilter.component';
import { DatagridTableBaseColumnFilterModel } from '../basecolumnfilter.model';
import { DatagridTableService } from '@app/components/datagridtable/datagridtable.service';
import { DatagridTableColumnComponent } from '@app/components/datagridtable/column/column.component';
import { DatagridTableStringColumnFilterModel } from './stringfilter.model';
import { DatagridTableColumnFilterValueModel } from '../filtervalue.model';


@Component({
  selector: 'app-datagridtable-columnfilter-string',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './stringcolumnfilter.component.html',
  styleUrl: './stringcolumnfilter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridTableStringfilterComponent extends DatagridTableBaseColumnFilterComponent {

  filterControl: FormControl<string> = new FormControl<string>('');
  filterObj: DatagridTableBaseColumnFilterModel;

  constructor(
    protected datagridTableService: DatagridTableService,
    @Optional() public datagridTableColumnComponentRef: DatagridTableColumnComponent
  ) {
    super(datagridTableService, datagridTableColumnComponentRef);
  }

//###########################

  init(): void {
    const existingFilterObj: DatagridTableBaseColumnFilterModel = this.datagridTableService.getFilter(this.columnName);

    if(existingFilterObj) {
      this.filterObj = existingFilterObj;
    }else if(this.customFilterModel) {
      this.filterObj = this.customFilterModel;
    }else {
      this.filterObj = new DatagridTableStringColumnFilterModel();
    }

    if (Array.isArray(this.filterObj?.filterValues) && this.filterObj?.filterValues?.length > 0) {
      this.filterControl.patchValue(<string>this.filterObj.filterValues[0]?.value);
    }else {
      this.updateFilter([new DatagridTableColumnFilterValueModel('')]);
    }
  }

//###########################

  filterChange(): void {
    const filterValue = this.filterControl.value;
    if (filterValue) {
      this.updateFilter([new DatagridTableColumnFilterValueModel(filterValue)]);
    }
  }

//###########################

  resetChange(): void {
    this.filterControl.patchValue('');
    this.resetFilter();
  }

//###########################

//###########################

//###########################

//###########################

}
