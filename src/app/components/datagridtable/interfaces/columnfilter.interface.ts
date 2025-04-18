import { DatagridTableColumnComponent } from "../column/column.component";

export interface IDatagridTableColumnFilterComponent {
  columnName: string;
  datagridTableColumnComponentRef: DatagridTableColumnComponent
  getColumnName(): void
  filterCallback(dataRow: any): boolean;
  closeFilter(): void;
  updateFilter(): void;
  resetFilter(): void;
  addFilterCallback(): void;
}
