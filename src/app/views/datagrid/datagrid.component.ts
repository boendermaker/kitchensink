import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatagridTableHeaderComponent } from '@app/components/datagridtable/header/header.component';
import { DatagridTableCellComponent } from '@app/components/datagridtable/cell/cell.component';
import { DatagridTableColumnComponent } from '@app/components/datagridtable/column/column.component';
import { DatagridTableComponent } from '@app/components/datagridtable/datagridtable.component';
import { CdkDragHandle, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [DatagridTableComponent, MatTableModule, MatSortModule, DatagridTableCellComponent, DatagridTableHeaderComponent, DatagridTableColumnComponent],
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.scss'
})
export class DatagridComponent {

  tableData: BehaviorSubject<any[]> = new BehaviorSubject([
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
  ]);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  addData(): void {
    this.tableData.next(this.tableData.value.concat({position: Math.round(Math.random()*100), name: 'Blubb', weight: Math.random()*1000, symbol: 'XX'}));
  }

  dropColumn(e): void {
    console.log('dropColumn', e);
  }

}
