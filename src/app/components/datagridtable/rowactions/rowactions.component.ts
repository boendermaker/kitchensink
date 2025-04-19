import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, OnInit, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-datagridtable-rowactions',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './rowactions.component.html',
  styleUrl: './rowactions.component.scss'
})
export class DatagridTableRowactionsComponent implements AfterViewInit, AfterContentInit {

  @ContentChildren(MatMenuItem) menuItems: QueryList<MatMenuItem>;

  rowActionsMenuItems: MatMenuItem[] = [];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {

  }

  async ngAfterContentInit() {
    this.menuItems.forEach(() => {
      this.rowActionsMenuItems = this.menuItems.toArray();
    })
  }

}
