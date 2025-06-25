import { Component, DestroyRef, inject } from '@angular/core';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../../datagridtable.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EDatagridTableStateChangeEvents } from '../../interfaces/statechangetypes.enum';

@Component({
  selector: 'app-datagridtable-selectionactions',
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './selectionactions.component.html',
  styleUrl: './selectionactions.component.scss'
})
export class DatagridTableSelectionsComponent {
  destroyRef: DestroyRef = inject(DestroyRef);

  lastSelectedSegmentRow: number = 1;

  constructor(
    public datagridTableService: DatagridTableService
  ) {

  }

  ngOnInit(): void {
    this.handleSelectionChange();
  }

  //###########################

  handleSelectionChange(): void {
    this.datagridTableService
    .state
    .rowSelection
    .changed
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((selection) => this.datagridTableService.triggerEvent(EDatagridTableStateChangeEvents.CHANGE_SELECTION_ROW));
  }

  //###########################

  deselectAllRows(): void {
    this.datagridTableService.state.rowSelection.clear();
  }
  
  //###########################

}
