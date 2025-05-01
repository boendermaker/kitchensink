import { DatagridTableColumnComponent } from "../column/column.component";
import { IDatagridTableColumnFilter } from "./columnfilter.inteface";

export interface IDatagridTableColumnFilterComponent {
  columnName: string;
  datagridTableColumnComponentRef: DatagridTableColumnComponent
  getColumnName(): void
  filterRef: IDatagridTableColumnFilter
  closeFilter(): void;
  updateFilter(): void;
  resetFilter(): void;
  addFilterCallback(): void;
}
