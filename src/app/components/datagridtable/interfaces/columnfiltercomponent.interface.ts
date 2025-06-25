import { DatagridTableColumnComponent } from "../column/column.component";
import { IDatagridTableColumnFilter } from "./columnfilter.inteface";

export interface IDatagridTableColumnFilterComponent {
  columnName: string;
  datagridTableColumnComponentRef: DatagridTableColumnComponent
  getColumnName(): void
  propPath: string[] | null;
  closeFilter(): void;
  updateFilter(): void;
  resetFilter(): void;
  filterRef: IDatagridTableColumnFilter
  customFilterRef: IDatagridTableColumnFilter | null;
  addDbFilterCallback(): void;
  addFilterCallback(): void;
}
