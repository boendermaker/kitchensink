import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { DatagridTableService } from '../../../datagridtable.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@app/directives/clickoutsidedirective/clickoutside.directive';
import { DatagridTableColumnComponent } from '@app/components/datagridtable/column/column.component';
import { EDatagridTableStateChangeEvents } from '@app/components/datagridtable/interfaces/statechangetypes.enum';
import { DatagridTableColumnFilterValueModel } from '../filtervalue.model';
import { DatagridTableBasefilterComponent } from '../basefilter.component';

@Component({
  selector: 'app-datagridtable-columnfilter-string',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule, ClickOutsideDirective],
  templateUrl: './stringcolumnfilter.component.html',
  styleUrl: './stringcolumnfilter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridTableStringfilterComponent extends DatagridTableBasefilterComponent implements OnInit, OnDestroy, AfterViewInit {

  filterControl: FormControl<string> = new FormControl<string>('');

  constructor(
    protected datagridTableService: DatagridTableService,
    @Optional() public datagridTableColumnComponentRef: DatagridTableColumnComponent
  ) {
    super(datagridTableService, datagridTableColumnComponentRef);
  }

//###########################

  init(): void {
    const filterObj = this.datagridTableService.getFilter(this.columnName);
    
    if (Array.isArray(filterObj?.filterValues) && filterObj?.filterValues?.length > 0) {
      this.filterControl.patchValue(<string>filterObj.filterValues[0]?.value);
    }else {
      this.updateFilter([new DatagridTableColumnFilterValueModel('')]);
    }

  }

//###########################

  filterChange(): void {
    const filterObj = this.datagridTableService.getFilter(this.columnName);
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

  tester(): void {
    console.log('TESTER', 
      this.datagridTableService.getFilter(this.columnName).getMongoDbFilterObj()
    );
  }

//###########################

//###########################

//###########################

}
