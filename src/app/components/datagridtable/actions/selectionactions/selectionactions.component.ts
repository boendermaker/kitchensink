import { Component } from '@angular/core';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../../datagridtable.service';

@Component({
  selector: 'app-datagridtable-selectionactions',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './selectionactions.component.html',
  styleUrl: './selectionactions.component.scss'
})
export class DatagridTableSelectionsComponent {

  lastSelectedSegmentRow: number = 1;

  constructor(
    public datagridTableService: DatagridTableService
  ) {

  }

  ngOnInit(): void {

  }

  //###########################

  deselectAllRows(): void {
    this.datagridTableService.state.rowSelection.clear();
  }

  //###########################

}
