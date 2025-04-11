import { Component, Input, OnInit } from '@angular/core';
import { BaseColumnFilter } from '../basefilter.class';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { DatagridTableService } from '../../datagridtable.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';

@Component({
  selector: 'app-stringcolumnfilter',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './stringfilter.component.html',
  styleUrl: './stringfilter.component.scss'
})
export class StringfilterComponent extends BaseColumnFilter implements OnInit {

  @Input() column: string;

  constructor(
    private datagridTableService: DatagridTableService,
  ) {
    super();
  }

  ngOnInit() {
    this.datagridTableService.addColumnFilterRef(this);
  }

//###########################

  filterCallback(dataRow: any, targetPaths: string[]): boolean {
    console.log('DATAROW ', dataRow, targetPaths);
    return true;
  }

//###########################

}
