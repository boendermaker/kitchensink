import { ChangeDetectorRef, Component, DestroyRef, inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../../datagridtable.service';
import { DatagridTableActionsComponent } from '../actions.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datagridtable-columntoggle',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './columntoggle.component.html',
  styleUrl: './columntoggle.component.scss'
})
export class DatagridTableColumntoggleComponent implements OnInit {

  destroyRef: DestroyRef = inject(DestroyRef);

  @Input() mode: 'menuitem' | 'actionbutton';

  formGroup: FormGroup = new FormGroup({})

  constructor(
    public datagridTableService: DatagridTableService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.addToogleColumnControls();
    this.formGroupChanged();
  }

  //###########################

  addToogleColumnControls() {
    this.datagridTableService.state.columns.forEach((column: string) => {
      if (!this.formGroup.get(column)) {
        this.formGroup.addControl(column, new FormControl(true));
      }
    });
  }

  //###########################

  updateDisplayedColumns(value: unknown) {
    this.datagridTableService.state.displayedColumns = Object.keys(value).filter((key: string) => value[key]);
    this.datagridTableService.state.tableInstanceRef.renderRows();
  }

  //###########################

  formGroupChanged(): void {
    this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: unknown) => {
      this.updateDisplayedColumns(value);
      this.datagridTableService.triggerStateChange();
    });
  }

  //###########################

}

