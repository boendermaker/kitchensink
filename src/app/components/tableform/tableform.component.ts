import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tableform',
  templateUrl: './tableform.component.html',
  styleUrls: ['./tableform.component.scss']
})
export class TableformComponent implements OnInit {

  dataSource: MatTableDataSource<AbstractControl>;
  formArrayName: string = 'signals';
  form: UntypedFormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.form = <UntypedFormGroup>this.controlContainer.control;
    this.form.addControl(this.formArrayName, this.fb.array([]));
    this.dataSource = new MatTableDataSource((this.form.get(this.formArrayName) as UntypedFormArray).controls);
  }

}



/*


@UntilDestroy()
@Component({
  selector: 'audako4-pie-chart-signal-select',
  templateUrl: './pie-chart-signal-select.component.html',
  styleUrls: ['./pie-chart-signal-select.component.scss'],
})
export class PieChartSignalSelectComponent implements OnInit {
  @Input() data: Observable<(IPieChartFormSignalModel & IPieChartFormFormulaModel)[]>;
  @Output() datachanged: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['Name', 'Label', 'Type', 'Aggregation', 'Color', 'Actions'];
  AggregationTypes = Object.keys(EPieChartWidgetFormAggregationTypes);
  formArrayName: string = 'signals'; //Main FormArray name all controls are into under parent FormGroup
  excludeKeys = {
    Signal: ['color', 'aggregation', 'CompressionSettings'],
    Formula: [],
  };

  dataSource: MatTableDataSource<AbstractControl>;
  form: UntypedFormGroup;
  compressionInterval = Object.keys(CompressionInterval);

  constructor(
    private fb: UntypedFormBuilder,
    private controlContainer: ControlContainer,
    private _entitySelectService: EntitySelectService,
    private userNotificationService: UserNotificationService,
    private translateService: TranslateService
  ) {
    PieChartHelper.init(this.translateService);
  }

  //######################################################################################################################
  //Direct acces to signals formarray with all controls
  get signals() {
    return this.form.controls[this.formArrayName] as UntypedFormArray;
  }

  //######################################################################################################################

  ngOnInit(): void {
    //Get parent FormGroup and add this FormArray with name to it with all controls into
    //R3 Injector error = Add [formGroup]="yourFormGroupName" to parent html template
    this.form = <UntypedFormGroup>this.controlContainer.control;
    this.form.addControl(this.formArrayName, this.fb.array([]));

    this.dataSource = new MatTableDataSource((this.form.get(this.formArrayName) as UntypedFormArray).controls);

    this.handleData();
    this.handleFormChange();
  }

  //######################################################################################################################

  handleData(): void {
    this.data.pipe(untilDestroyed(this)).subscribe((data: (IPieChartFormSignalModel & IPieChartFormFormulaModel)[]) => {
      this.setData(data);
    });
  }

  //######################################################################################################################

  handleFormChange(): void {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((formState) => {
      this.datachanged.emit(formState[this.formArrayName]);
    });
  }

  //######################################################################################################################

  createRowFormGroupFromStore(
    dataItem: IPieChartFormSignalModel & IPieChartFormFormulaModel,
    entityType?: 'Formula' | 'Signal'
  ) {
    const formGroup = {
      Signal: new UntypedFormGroup(PieChartHelper.signalControlsFromStore(dataItem)),
      Formula: new UntypedFormGroup({}),
    };
    return formGroup[entityType];
  }

  //######################################################################################################################

  createRowFormGroupFromSelect(entityItem: Signal | Formula, entityType?: 'Formula' | 'Signal') {
    const formGroup = {
      Signal: new UntypedFormGroup(PieChartHelper.signalControlsFromSelect(<Signal>entityItem)),
      Formula: new UntypedFormGroup({}),
    };
    return formGroup[entityType];
  }

  //######################################################################################################################

  setData(data: (IPieChartFormSignalModel & IPieChartFormFormulaModel)[]): void {
    data.forEach((dataItem: IPieChartFormSignalModel & IPieChartFormFormulaModel) => {
      const currentRowFormGroup = this.createRowFormGroupFromStore(dataItem, 'Signal');
      this.signals.push(currentRowFormGroup);
    });

    this.updateDataSource();
  }

  //######################################################################################################################

  addRow(entityItem: Signal | Formula, entityType?: 'Signal' | 'Formula'): void {
    const selectedRowFormGroup = this.createRowFormGroupFromSelect(entityItem, entityType);
    this.signals.push(selectedRowFormGroup);
  }

  //######################################################################################################################

  updateRow(entityItem: Signal | Formula, entityType: 'Signal' | 'Formula', selectedRowIndex: number): void {
    const selectedRowFormGroupFromSelect = this.createRowFormGroupFromSelect(entityItem, entityType);
    const selectedControls = selectedRowFormGroupFromSelect.controls;

    const selectedRowFormGroupFromTable = this.signals.get([selectedRowIndex]);
    const selectedRowControls = (<UntypedFormArray>selectedRowFormGroupFromTable).controls;

    Object.keys(selectedRowControls).forEach((k: string) => {
      if (!this.excludeKeys[entityType].includes(k)) {
        selectedRowControls[k].patchValue(selectedControls[k].value);
      }
    });
  }

  //######################################################################################################################

  removeRow(index: number): void {
    this.signals.removeAt(index);
    this.updateDataSource();
  }

  //######################################################################################################################

  updateDataSource(): void {
    this.dataSource._updateChangeSubscription();
  }

  //######################################################################################################################

  processSelectedItems(
    entityItems: Signal[] | Formula[],
    entityType?: 'Signal' | 'Formula',
    action?: 'add' | 'update',
    selectedRowIndex?: number
  ): void {
    if (entityItems?.length > 0) {
      //----------------------------------------------------------------------------------------------------------------------
      if (!action || action === 'add') {
        let existingItemsCount = 0;

        // @ts-ignore
        entityItems.forEach((entityItem: Signal | Formula) => {
          !this.entityItemExist(entityItem.Id) ? this.addRow(entityItem, entityType) : existingItemsCount++;
        });

        existingItemsCount > 0
          ? this.msg(PieChartHelper.snackmsg('warn', existingItemsCount, '{{count}}'), 'warn')
          : this.msg(PieChartHelper.snackmsg('success', '', ''), 'success');
      }
      //----------------------------------------------------------------------------------------------------------------------
      if (action === 'update') {
        if (!this.entityItemExist(entityItems[0].Id)) {
          this.updateRow(entityItems[0], entityType, selectedRowIndex);
          this.msg('Erfolgreich', 'success');
        } else {
          this.msg('Existiert bereits', 'info');
        }
      }
      //----------------------------------------------------------------------------------------------------------------------
    }

    this.updateDataSource();
  }

  //######################################################################################################################

  openSignalSelectModal(
    selectionType: 'Signal' | 'Formula',
    selectedRowIndex?: number,
    action?: 'add' | 'update'
  ): void {
    selectionType === 'Formula' ? Formula : Signal;

    if (selectionType === 'Formula') {
      this._entitySelectService.selectMultipleEntities<Formula>({Type: Formula}).subscribe((formulas) => {
        this.processSelectedItems(formulas, 'Formula', action, selectedRowIndex);
      });
    } else {
      this._entitySelectService.selectMultipleEntities<Signal>({Type: Signal}).subscribe((signals) => {
        this.processSelectedItems(signals, 'Signal', action, selectedRowIndex);
      });
    }
  }

  //######################################################################################################################

  openSingleSignalWindow(id: number, entityType: 'Signal' | 'Formula'): void {
    window.open(window.location.origin + '/single/' + entityType + '/' + id);
  }

  //######################################################################################################################

  entityItemExist(id: string): boolean {
    return !!(<UntypedFormArray>this.signals).controls.find((f) => f.get('Id').value === id);
  }

  //######################################################################################################################

  msg(msg: string, type: 'info' | 'warn' | 'success'): void {
    const castMessage = {
      info: () => this.userNotificationService.publishInfoMessage(msg),
      warn: () => this.userNotificationService.publishWarningMessage(msg),
      success: () => this.userNotificationService.publishSuccessMessage(msg),
    };
    castMessage[type]();
  }

  //######################################################################################################################
}


*/