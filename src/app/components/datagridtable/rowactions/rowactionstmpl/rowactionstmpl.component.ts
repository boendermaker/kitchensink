import { Component, ContentChild, ContentChildren, ElementRef, HostBinding, Input, OnDestroy, OnInit, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { MatCellDef, MatColumnDef, MatRowDef } from '@angular/material/table';
import { NgTemplateOutlet } from '@angular/common';
import { DatagridTableService } from '../../datagridtable.service';

/**
 * Component for defining row actions in a datagrid table.
 * This component allows you to define custom actions that can be performed on each row of the datagrid.
 * <pre>
 *     <app-datagridtable-rowactionstmpl matColumDef="actions">
 *         <ng-template let-element="element">
 *             <button mat-icon-button><i class="material-icons-filled">delete</i></button>
 *         </ng-template>
 *     </app-datagridtable-rowactionstmpl>
 * </pre>
 */
@Component({
  selector: 'app-datagridtable-rowactionstmpl',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, NgTemplateOutlet],
  templateUrl: './rowactionstmpl.component.html',
  styleUrl: './rowactionstmpl.component.scss'
})
export class DatagridTableRowactionsTmplComponent implements OnInit, OnDestroy {

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  @Input() columnName: string = 'actions';
  //@ContentChildren(DatagridTableRowsummaryComponent, {descendants: true}) allSummaries: QueryList<DatagridTableRowsummaryComponent>;
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
      this.columnDef.name = this.columnName;
      this.columnDef.cell = this.cellDef;
      this.datagridTableService.state.tableInstanceRef.addColumnDef(this.columnDef);
    }
  }

  ngOnDestroy(): void {
    this.datagridTableService.state.tableInstanceRef.removeColumnDef(this.columnDef);
  }

}
