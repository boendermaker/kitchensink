import { ChangeDetectorRef, Component, DestroyRef, inject, Input, OnInit, Optional, signal, ViewChild, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../../datagridtable.service';
import { DatagridTableActionsComponent } from '../actions.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EDatagridTableStateChangeEvents } from '../../interfaces/statechangetypes.enum';
import * as _ from 'lodash';

/**
 * @title DatagridTableColumntoggleComponent
 * @description This component is used to toggle the visibility of columns in the datagrid table.
 * @example <app-datagridtable-columntoggle datagridtable-menu-item [menuitem]="true" [exclude]="['actions', 'position']"></app-datagridtable-columntoggle>
*/
@Component({
  selector: 'app-datagridtable-columntoggle',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './columntoggle.component.html',
  styleUrl: './columntoggle.component.scss'
})
export class DatagridTableColumntoggleComponent implements OnInit {

  @Input() menuitem: boolean = false;
  @Input() exclude: string[];

  destroyRef: DestroyRef = inject(DestroyRef);
  formGroup: FormGroup = new FormGroup({})

  $hideableColumns: WritableSignal<string[]> = signal([]);

  constructor(
    public datagridTableService: DatagridTableService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.addToggleColumnControls();
    this.formGroupChanged();
    this.setHideableColumns();
  }

  //###########################

  setHideableColumns(): void {
    this.$hideableColumns.set(this.datagridTableService.state.columns.filter((column: string) => !this.exclude?.includes(column)));
  }

  //###########################

  addToggleColumnControls() {
    this.datagridTableService.state.columns.forEach((column: string) => {
      if (!this.formGroup?.get(column)) {
        this.formGroup.addControl(column, new FormControl(true));
      }
    });
  }

  //###########################

  updateDisplayedColumns(value: unknown) {
    this.datagridTableService.state.displayedColumns = Object.keys(value).filter((key: string) => value[key]);
    this.datagridTableService.triggerStateChange(EDatagridTableStateChangeEvents.CHANGE_COLUMN_VISIBILITY);
  }

  //###########################

  formGroupChanged(): void {
    this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: unknown) => {
      this.updateDisplayedColumns(value);
    });
  }

  //###########################

}

