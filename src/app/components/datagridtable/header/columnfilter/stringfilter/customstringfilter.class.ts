import { IDatagridTableColumnFilterComponent } from "@app/components/datagridtable/interfaces/columnfiltercomponent.interface";
import { IDatagridTableColumnFilter } from "@app/components/datagridtable/interfaces/columnfilter.inteface";
import { DatagridTableStringfilterComponent } from "./stringcolumnfilter.component";
import { DatagridTableColumnComponent } from "@app/components/datagridtable/column/column.component";

export class DatagridTableCustomColumnStringFilter implements IDatagridTableColumnFilter {

  filterComponentRef: IDatagridTableColumnFilterComponent = null;
  columnName: string = null;

  constructor() {

  }

  dbFilterCallback(): any {
    return {
      [this.columnName]: {
        $regex: (<DatagridTableStringfilterComponent>this.filterComponentRef).filterControl.value,
        $options: 'i' // case insensitive
      }
    };
  }

  filterCallBack(dataRow: unknown): boolean {
    console.log('custom', this)
    const columnValue: string = dataRow?.[this.columnName].value.toString().toLowerCase();
    const filterValue: string = (<DatagridTableStringfilterComponent>this.filterComponentRef).filterControl.value.toString().toLowerCase();
    return columnValue.includes(filterValue);
  }

}
