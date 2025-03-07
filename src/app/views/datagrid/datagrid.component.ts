import { ChangeDetectorRef, Component, ViewChild, ViewChildren } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatagridTableHeaderComponent } from '@app/components/datagridtable/header/header.component';
import { DatagridTableCellComponent } from '@app/components/datagridtable/cell/cell.component';
import { DatagridTableColumnComponent } from '@app/components/datagridtable/column/column.component';
import { DatagridTableComponent } from '@app/components/datagridtable/datagridtable.component';
import { DatagridTableActionsComponent } from "../../components/datagridtable/actions/actions.component";
import { DatagridTableRowactionsComponent } from "../../components/datagridtable/rowactions/rowactions.component";
import { TitleComponent } from "../../components/datagridtable/title/title.component";
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, DatagridTableComponent, MatTableModule, MatSortModule, DatagridTableCellComponent, DatagridTableHeaderComponent, DatagridTableColumnComponent, DatagridTableActionsComponent, DatagridTableRowactionsComponent, TitleComponent],
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.scss'
})
export class DatagridComponent {

  @ViewChildren('table') table: DatagridTableComponent;

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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  displayedColumns2: string[] = ['position', 'name', 'symbol', 'actions'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.tableData);
  dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>(this.tableData2);

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    console.log(this.table);    
  }

  addData(): void {
    this.tableData.push({position: Math.round(Math.random()*100), name: 'Blubb', weight: Math.random()*1000, symbol: 'XX'});
    this.dataSource.connect().next(this.tableData);
  }

  removeData(): void {
    this.tableData.pop();
    this.dataSource.connect().next(this.tableData);
  }

  addData2(): void {
    this.tableData2.push({position: Math.round(Math.random()*100), name: 'Blah', symbol: Math.random()*500});
    this.dataSource2.connect().next(this.tableData2);
  }

  removeData2(): void {
    this.tableData2.shift();
    this.dataSource2.connect().next(this.tableData2);
  }

  dropColumn(e): void {
    console.log('dropColumn', e);
  }

  tester(e): void {
    console.log('tester', e);
  }

}
