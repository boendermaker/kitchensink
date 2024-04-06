import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { IDashboard, IDashboardWidget } from './dashboard.interface';
import { DashboardService } from './dashboard-service/dashboard.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CdkPortal, ComponentPortal, ComponentType, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { GridsterModule } from '../gridster2/gridster.module';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetContainerComponent } from './widget-container/widget-container.component';
import { WidgetSelectComponent } from './widget-select/widget-select.component';


/**
 * Dashboard Component
 * <pre>
 * Use a custom widget container component instead the default one:
 * <app-dashboard [customWidgetContainer]="YourCustomComponentImportReference"></app-dashboard>
 * </pre>
 */
@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
      CommonModule,
      PortalModule,
      GridsterModule,
      AllAngularMaterialMDCModulesModule,
      ReactiveFormsModule,
      WidgetContainerComponent,
      WidgetSelectComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  @ViewChild(CdkPortal) portalRef: CdkPortal;

  @Input() customWidgetContainer: ComponentType<any> = null;
  componentPortal: ComponentPortal<any>;
  componentRef: any;
  renderedDashboard: Partial<IDashboard> = {};

  constructor(
    private cdr: ChangeDetectorRef,
    public dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
    this.handleRenderedDashboard();
  }

  ngAfterViewInit(): void {
    this.setCustomWidgetContainer();
  }

  //##################################################################

  setCustomWidgetContainer(): void {
    if(this.customWidgetContainer) {
      this.componentPortal = new ComponentPortal(this.customWidgetContainer);
      this.cdr.markForCheck();
    }
  }

  //##################################################################

  onComponentRendering(ref: ComponentRef<any>, widget: IDashboardWidget): void {
    ref = ref as ComponentRef<any>;
    ref.instance['widgetId'] = widget.id;
  }

  //##################################################################

  handleRenderedDashboard(): void {
    this.dashboardService
    .renderedDashboard_
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (renderedDashboard: IDashboard) => {
        this.renderedDashboard = renderedDashboard;
        this.cdr.markForCheck();
      }
    })
  }

  //##################################################################

}

