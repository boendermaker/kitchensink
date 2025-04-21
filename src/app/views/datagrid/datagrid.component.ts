import { ChangeDetectorRef, Component, ViewChild, ViewChildren } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatagridTableHeaderComponent } from '@app/components/datagridtable/header/header.component';
import { DatagridTableCellComponent } from '@app/components/datagridtable/cell/cell.component';
import { DatagridTableColumnComponent } from '@app/components/datagridtable/column/column.component';
import { DatagridTableComponent } from '@app/components/datagridtable/datagridtable.component';
import { DatagridTableActionsComponent } from "../../components/datagridtable/actions/actions.component";
import { DatagridTableRowactionsComponent } from "../../components/datagridtable/rowactions/rowactions.component";
import { DatagridTableTitleComponent } from "../../components/datagridtable/title/title.component";
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableStringfilterComponent } from '@app/components/datagridtable/header/columnfilter/stringfilter/stringcolumnfilter.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { DatagridTableColumntoggleComponent } from "../../components/datagridtable/actions/columntoggle/columntoggle.component";
import { DatagridTableOrderColumnComponent } from "@app/components/datagridtable/header/ordercolumn/ordercolumn.component";
import { DatagridTableResizeColumnComponent } from "@app/components/datagridtable/header/resizecolumn/resizecolumn.component";
import { DatagridTablePaginatorComponent } from "../../components/datagridtable/paginator/paginator.component";
import { GithubIssue, TestDataService } from '@app/components/datagridtable/testdata.service';
import { DatagridTableService } from '@app/components/datagridtable/datagridtable.service';
import { DatagridTableLoadingIndicatorComponent } from "../../components/datagridtable/loadingindicator/loadingindicator.component";

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, DatagridTableComponent, MatTableModule, MatSortModule, DatagridTableCellComponent, DatagridTableHeaderComponent, DatagridTableColumnComponent, DatagridTableActionsComponent, DatagridTableRowactionsComponent, DatagridTableTitleComponent, DatagridTableStringfilterComponent, DatagridTableColumntoggleComponent, DatagridTableOrderColumnComponent, DatagridTableResizeColumnComponent, DatagridTablePaginatorComponent, DatagridTableLoadingIndicatorComponent],
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.scss',
  providers: [TestDataService],
})
export class DatagridComponent {

  tableData: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  tableData2: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  ];

  tableData3: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  displayedColumns2: string[] = ['position', 'name', 'symbol', 'actions'];
  displayedColumns3: string[] = ['position', 'name', 'symbol', 'actions'];
  displayedColumnsGithub: string[] = ['created_at', 'number', 'state', 'title'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.tableData);
  dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>(this.tableData2);
  dataSourceGithub: MatTableDataSource<GithubIssue> = new MatTableDataSource<GithubIssue>([]);
  dataSourceConnection: BehaviorSubject<unknown> = this.dataSource.connect();
  dataSource2Connection: BehaviorSubject<unknown> = this.dataSource2.connect();

  dataChanged: Subject<void> = new Subject<void>();
  datagridTableServiceGithub: DatagridTableService;

  constructor(
    private cdr: ChangeDetectorRef,
    public testDataService: TestDataService
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.testDataService.init(this.datagridTableServiceGithub);
  }

  addData(): void {
    this.tableData.push({position: Math.round(Math.random()*100), name: 'Blubb', weight: Math.random()*1000, symbol: 'XX'});
    this.dataSourceConnection.next(this.tableData);
  }

  removeData(): void {
    this.tableData.pop();
    this.dataSourceConnection.next(this.tableData);
  }

  addData2(): void {
    this.tableData2.push({position: Math.round(Math.random()*100), name: 'Blah', symbol: Math.random()*500});
    this.dataSource2Connection.next(this.tableData2);
  }

  removeData2(): void {
    this.tableData2.shift();
    this.dataSource2Connection.next(this.tableData2);
  }

  addData3(): void {
    this.tableData3.push({position: Math.round(Math.random()*100), name: 'Blah', symbol: Math.random()*500});
    this.dataChanged.next();
  }

  removeData3(): void {
    this.tableData3.shift();
    this.dataChanged.next();
  }

  dropColumn(e): void {
    console.log('dropColumn', e);
  }

  tester(e): void {
    console.log('tester', e);
  }

}
