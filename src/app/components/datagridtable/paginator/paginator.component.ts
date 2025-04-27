import { AfterViewInit, ChangeDetectorRef, Component, Input, input, OnInit, Optional, ViewChild } from '@angular/core';
import { Options } from 'blockly';
import { DatagridTableComponent } from '../datagridtable.component';
import { DatagridTableService } from '../datagridtable.service';
import { MatPaginator } from '@angular/material/paginator';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';

@Component({
  selector: 'app-datagridtable-paginator',
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class DatagridTablePaginatorComponent implements OnInit, AfterViewInit {

  @Input() connect: boolean = true;
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100, 500, 1000];

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    public datagridTableService: DatagridTableService,
    public cdr: ChangeDetectorRef,
    @Optional() public datagridTableComponentRef: DatagridTableComponent,
  ) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.datagridTableService.setPaginator(this.paginator);
    this.connectToDataSource();
    this.handlePageChange();
    this.setPageOptions();
  }

  setPageOptions(): void {
    this.datagridTableService.setPageIndex(this.paginator.pageIndex);
    this.datagridTableService.setPageSize(this.paginator.pageSize ?? this.pageSize ?? 50);
    this.datagridTableService.triggerStateChange();
  }

  handlePageChange(): void {
    this.datagridTableService.state.paginator.page.subscribe({
      next: () => {
        this.setPageOptions();
      }
    })
  }

  connectToDataSource(): void {
    if(this.connect) {
      this.datagridTableService.setTotalRows(this.datagridTableService.state.dataSource.data.length);
      this.datagridTableService.connectPaginatorToDataSource();
    }
  }

}
