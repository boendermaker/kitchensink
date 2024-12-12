import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, OnInit, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatHeaderRowDef } from '@angular/material/table';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-datagridtable-rowactions',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './rowactions.component.html',
  styleUrl: './rowactions.component.scss'
})
export class DatagridTableRowactionsComponent implements AfterViewInit {

  rowActionsMenuItems: {icon: string; title: string; listener: any}[] = []

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    this.buildRowActions();
  }

  buildRowActions() {
    const rowActions: HTMLElement[] = Array.from(this.elementRef.nativeElement.querySelectorAll('[mat-icon-button]'));

    if(rowActions.length > 0) {

      const rowActionsMenuItems: HTMLElement[] = rowActions?.slice(2, rowActions?.length);

      rowActionsMenuItems.forEach((rowActionMenuItem: HTMLElement) => {
        const icon = rowActionMenuItem.querySelector('i').innerText;
        const title = rowActionMenuItem.getAttribute('title');
        const listener = rowActionMenuItem.eventListeners ? rowActionMenuItem.eventListeners()[0] : null;
        rowActionMenuItem.remove();
        this.rowActionsMenuItems.push({icon, title, listener});
      });

      this.cdr.detectChanges();

    }
  }

}