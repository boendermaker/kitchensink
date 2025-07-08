import { Component, ContentChild, HostBinding, Input, TemplateRef, ViewChild } from '@angular/core';
import { DatagridTableService } from '../datagridtable.service';
import { MatCellDef, MatColumnDef, MatFooterCellDef, MatHeaderCellDef } from '@angular/material/table';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { RowsummaryComponent } from "./rowsummary/rowsummary.component";
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-datagridtable-rowdetail',
  imports: [AllAngularMaterialMDCModulesModule, NgTemplateOutlet],
  templateUrl: './rowdetail.component.html',
  styleUrl: './rowdetail.component.scss'
})
export class DatagridTabelRowdetailComponent {

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  @Input() columnName: string = 'rowdetail';

  constructor(
    private datagridTableService: DatagridTableService,
  ) {}

  @HostBinding('attr.ariaHidden') ariaHidden!: true;
  @HostBinding('class') classes!: 'column-template Mat-visually-hidden';

  @ViewChild(MatColumnDef, {static: true}) columnDef!: MatColumnDef;
  @ViewChild(MatCellDef, {static: true}) cellDef!: MatCellDef;

  ngOnInit(): void {
    if (this.columnDef) {
      this.columnDef.name = this.columnName;
      this.columnDef.cell = this.cellDef;
      this.datagridTableService.state.tableInstanceRef.addColumnDef(this.columnDef);
    }
  }

  ngOnDestroy(): void {
    this.datagridTableService.state.tableInstanceRef.removeColumnDef(this.columnDef);
  }

}
