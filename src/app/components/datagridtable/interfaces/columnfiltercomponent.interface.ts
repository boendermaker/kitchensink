import { DatagridTableColumnComponent } from "../column/column.component";
import { IDatagridTableColumnFilter } from "./columnfilter.inteface";

export interface IDatagridTableColumnFilterComponent {
  columnName: string;
  datagridTableColumnComponentRef: DatagridTableColumnComponent
  propPath: string[] | null;
  closeFilter(): void;
  updateFilter(): void;
  resetFilter(): void;
}
