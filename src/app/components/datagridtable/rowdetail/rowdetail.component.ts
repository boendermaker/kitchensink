import { Component, ContentChild, ContentChildren, HostBinding, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { DatagridTableService } from '../datagridtable.service';
import { MatCellDef, MatColumnDef, MatRowDef } from '@angular/material/table';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { NgTemplateOutlet } from '@angular/common';
import { DatagridTableColumnComponent } from '../column/column.component';

/**
 * Component for displaying row details in a datagrid table.
 * This component is used to show additional information for a row when it is expanded.
 * <app-datagridtable-rowdetail>
 *  <ng-template let-element="element">
 *    <div>
 *      <p><strong>Position:</strong> {{element?.position}}</p>
 *    </div>
 *  </ng-template>
 * </app-datagridtable-rowdetail>
 */
@Component({
  selector: 'app-datagridtable-rowdetail',
  imports: [AllAngularMaterialMDCModulesModule, NgTemplateOutlet, DatagridTableColumnComponent],
  templateUrl: './rowdetail.component.html',
  styleUrl: './rowdetail.component.scss'
})
export class DatagridTabelRowDetailComponent implements OnInit, OnDestroy {

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  //@ContentChildren(DatagridTableRowsummaryComponent, {descendants: true}) allSummaries: QueryList<DatagridTableRowsummaryComponent>;
  //@Input() columnName: string = 'rowdetail';
  //_summaries: QueryList<DatagridTableRowsummaryComponent> = new QueryList<DatagridTableRowsummaryComponent>();

  constructor(
    public datagridTableService: DatagridTableService,
  ) {}

  @HostBinding('attr.ariaHidden') ariaHidden!: true;
  @HostBinding('class') classes!: 'column-template Mat-visually-hidden';

  @ViewChild(MatColumnDef, {static: true}) columnDef!: MatColumnDef;
  @ViewChild(MatCellDef, {static: true}) cellDef!: MatCellDef;
  @ViewChild(MatRowDef, {static: true}) rowDef!: MatRowDef<any>;

  ngOnInit(): void {
    if (this.columnDef) {
      this.columnDef.name = 'rowdetail';
      this.columnDef.cell = this.cellDef;
      this.datagridTableService.state.tableInstanceRef.addColumnDef(this.columnDef);
    }
  }

  ngOnDestroy(): void {
    this.datagridTableService.state.tableInstanceRef.removeColumnDef(this.columnDef);
  }

}
