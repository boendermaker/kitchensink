import { ElementRef, Input, Optional, ViewChild } from "@angular/core";
import { DatagridTableBaseColumnFilterModel } from "./basecolumnfilter.model";
import { FormControl } from "@angular/forms";
import { DatagridTableService } from "../../datagridtable.service";
import { DatagridTableColumnComponent } from "../../column/column.component";

import { Component } from "@angular/core";
import { DatagridTableColumnFilterValueModel } from "./filtervalue.model";
import { DatagridTableStringfilterModel } from "./stringfilter/stringfilter.model";
import { EDatagridTableStateChangeEvents } from "../../interfaces/statechangetypes.enum";

@Component({
    selector: 'app-datagrid-table-basefilter',
    template: ''
})
export class DatagridTableBasefilterComponent {

    @ViewChild('detail', {static: true}) detailElement: ElementRef<HTMLDetailsElement> | undefined;
    @ViewChild('content', {static: true}) columnFilterElement: ElementRef<HTMLDetailsElement> | undefined;
    @Input() customFilterModel: DatagridTableBaseColumnFilterModel | undefined;
    @Input() propPath: string[] = [];

    columnName: string = '';

    constructor(
    protected datagridTableService: DatagridTableService,
    @Optional() public datagridTableColumnComponentRef: DatagridTableColumnComponent,
    ) {
    }

    ngOnInit() {
        this.columnName = this.datagridTableColumnComponentRef.getColumnName();
    }

    ngAfterViewInit(): void {
        this.init();
    }

    ngOnDestroy(): void {
        console.log(
            'DESTROYED'
        )
    }

    //###########################

    init(): void {
    }

    //###########################

    updateFilter(filterValues: DatagridTableColumnFilterValueModel[]): void {
        let filterObj: DatagridTableBaseColumnFilterModel;

        if(this.customFilterModel) {
            filterObj = this.customFilterModel;
        }else {
            filterObj = new DatagridTableStringfilterModel();
        }

        filterObj.setFilterProperties(this.columnName, this.propPath, filterValues);
        this.datagridTableService.setFilter(this.columnName, filterObj);
    }
    
    //###########################

    resetFilter(): void {
        this.datagridTableService.triggerEvent(EDatagridTableStateChangeEvents.CHANGE_COLUMN_FILTER_RESET);
        this.datagridTableService.resetFilter(this.columnName);
    }

    //###########################

    closeFilter(): void {
        this.detailElement?.nativeElement.toggleAttribute('open', false);
    }

    //###########################

}