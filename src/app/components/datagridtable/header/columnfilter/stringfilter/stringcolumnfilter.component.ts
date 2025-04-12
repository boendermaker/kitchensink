import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BaseColumnFilter } from '../basecolumnfilter.class';
import * as _ from 'lodash';
import { DatagridTableService } from '../../../datagridtable.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@app/directives/clickoutsidedirective/clickoutside.directive';

@Component({
  selector: 'app-datagridtable-columnfilter-string',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule, ClickOutsideDirective],
  templateUrl: './stringcolumnfilter.component.html',
  styleUrl: './stringcolumnfilter.component.scss'
})
export class StringfilterComponent extends BaseColumnFilter implements OnInit {

  @ViewChild('detail') detailElement: ElementRef<HTMLDetailsElement> | undefined;

  @Input() filtercolumn: string;

  filterControl: FormControl<string> = new FormControl<string>('');

  constructor(
    private datagridTableService: DatagridTableService,
  ) {
    super();
  }

  ngOnInit() {
    this.addFilterCallback();
  }

//###########################

  closeFilter(): void {
    (this.detailElement?.nativeElement.toggleAttribute('open', false) as unknown) as void;
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

  addFilterCallback(): void {
    this.datagridTableService.addColumnFilterCallback(this.filterCallback.bind(this));
  }

//###########################

  filterCallback(dataRow: any): boolean {
    const columnValue: string = dataRow?.[this.filtercolumn.toLowerCase()].toString().toLowerCase();
    const filterValue: string = this.filterControl.value.toString().toLowerCase();
    return columnValue.includes(filterValue);
  }

//###########################

}
