import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, inject, Input, input, OnInit, Optional, ViewChild } from '@angular/core';
import { Options } from 'blockly';
import { DatagridTableComponent } from '../datagridtable.component';
import { DatagridTableService } from '../datagridtable.service';
import { MatPaginator } from '@angular/material/paginator';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-datagridtable-paginator',
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class DatagridTablePaginatorComponent implements OnInit, AfterViewInit {

  destroyRef: DestroyRef = inject(DestroyRef);

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
    this.updatePaginatorState();
  }

  handlePageChange(): void {
    this.datagridTableService.state.paginator.page.subscribe({
      next: () => {
        this.updatePaginatorState();
      }
    })
  }

  updatePaginatorState(): void {
    this.datagridTableService.setPageIndex(this.paginator.pageIndex);
    this.datagridTableService.setPageSize(this.paginator.pageSize ?? this.pageSize ?? 50);
    this.datagridTableService.triggerStateChange();
  }

  connectToDataSource(): void {
    if(this.connect) {
      this.datagridTableService.connectPaginatorToDataSource();
    }
  }

}
