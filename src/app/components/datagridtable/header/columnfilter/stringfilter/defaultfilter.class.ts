import { IDatagridTableColumnFilterComponent } from "@app/components/datagridtable/interfaces/columnfiltercomponent.interface";
import { IDatagridTableColumnFilter } from "@app/components/datagridtable/interfaces/columnfilter.inteface";
import { DatagridTableStringfilterComponent } from "./stringcolumnfilter.component";
import { DatagridTableService } from "@app/components/datagridtable/datagridtable.service";

export class DatagridTableColumnDefaultFilter implements IDatagridTableColumnFilter {

  filterComponentRef: DatagridTableStringfilterComponent = null;
  columnName: string = null;

  dbFilterCallback(dataRow: unknown): any {
    return {
      [this.columnName]: {
        $regex: (<DatagridTableStringfilterComponent>this.filterComponentRef).filterControl.value,
        $options: 'i' // case insensitive
      }
    };
  }
  

  filterCallBack(dataRow: unknown): boolean {
    let results: boolean[] = [];

    if(this.filterComponentRef.propPath.length > 0) {
      
      this.filterComponentRef.propPath.forEach((propPathDestination: string) => {

        if(dataRow && dataRow?.[this.columnName]?.hasOwnProperty(propPathDestination)) {
          const propValue: string = dataRow?.[this.columnName]?.[propPathDestination].toString().toLowerCase();
          const filterValue: string = this.filterComponentRef?.filterControl?.value.toString().toLowerCase();
          results.push(propValue.includes(filterValue));
        }else{
          results.push(true);
        }

        return results.every((result: boolean) => result === true);

      });

    }else {

      const columnValue: string = dataRow?.[this.columnName].toString().toLowerCase();
      const filterValue: string = this.filterComponentRef?.filterControl?.value.toString().toLowerCase();
      return columnValue.includes(filterValue);

    }

  }

}
