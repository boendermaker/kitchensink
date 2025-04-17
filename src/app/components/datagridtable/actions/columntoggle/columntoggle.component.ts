import { ChangeDetectorRef, Component, DestroyRef, inject, Input, Optional, ViewChild } from '@angular/core';
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
export class ColumntoggleComponent {
  destroyRef: DestroyRef = inject(DestroyRef);

  @Input() mode: 'menuitem' | 'action';

  columnToggleFormGroup: FormGroup = new FormGroup({
    tester: new FormArray([]),
  });

  constructor(
    public datagridTableService: DatagridTableService,
    private cdr: ChangeDetectorRef,
    @Optional() public parent?: DatagridTableActionsComponent,
  ) {
  }

  ngOnInit() {
    this.handleToggleColumn();    
  }

  ngAfterViewInit() {
     
  }

  ngAfterContentInit() {
  }

  handleToggleColumn() {
    this.columnToggleFormGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => {
        console.log(value);
      }
    });
  }

}
function takeUntilDestroyed(destroyRef: any): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

