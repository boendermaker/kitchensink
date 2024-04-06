import { Injectable } from '@angular/core';
import { IDashboard, IDashboardWidgetContent, dashboardDialogSize } from '../dashboard.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dashboard } from '../dashboard.class';
import { DashboardServiceWidgetUtils } from './dashboard.service.widgetutils.class';
import { DashboardServiceDashboardUtils } from './dashboard.service.dashboardutils.class';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable()
export class DashboardService {

  widgetContent: IDashboardWidgetContent[] = [];

  widgetUtils: DashboardServiceWidgetUtils = new DashboardServiceWidgetUtils(this);
  dashboardUtils: DashboardServiceDashboardUtils = new DashboardServiceDashboardUtils(this);

  dashboards$: BehaviorSubject<IDashboard[]> = new BehaviorSubject([]);
  dashboards_: Observable<IDashboard[]> = this.dashboards$.asObservable();
  dashboards: IDashboard[] = [];

  renderedDashboard$: BehaviorSubject<IDashboard> = new BehaviorSubject(null);
  renderedDashboard_: Observable<IDashboard> = this.renderedDashboard$.asObservable();
  renderedDashboardId: string = '';
  renderedDashboardIndex: number = 0;

  stateChanged$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  stateChanged_: Observable<boolean> = this.stateChanged$.asObservable();

  tabIndex$: BehaviorSubject<number> = new BehaviorSubject(null);
  tabIndex_: Observable<number> = this.tabIndex$.asObservable();

  get dashboardCount(): number {
    return this.dashboardUtils.getTotalCount();
  }

  constructor(
    public dashboardDialog: MatDialog,
    public widgetDialog: MatDialog
  ) {}

  //##################################################################
  /** Initially set the widget content components, passt Object of Type IDashboardWidgetContent[] */
  setWidgetContent(widgetContent: IDashboardWidgetContent[]): void {
    this.widgetContent = widgetContent;
    this.stateChanged();
  }

  //##################################################################

  renderDashboardById(id: string): void {
    this.renderedDashboardId = id;
    const dashboard = this.dashboards$.value.find(f => f.id === id);
    this.renderedDashboard$.next(dashboard);
    this.stateChanged();
  }

  //##################################################################

  renderDashboardByIndex(index: number): void {
    const dashboard = this.dashboards$.value[index];
    this.renderedDashboardId = dashboard?.id;
    this.renderedDashboard$.next(dashboard);
    this.stateChanged();
  }

  //##################################################################

  getState() {
    const dashboards: IDashboard[] = this.dashboards$.value;
    return dashboards;
  }

  //##################################################################

  setState(dashboards: IDashboard[]) {
    if(dashboards.length > 0) {
      const tempDashboards: IDashboard[] = [];

      dashboards.forEach((dashboard) => {
        tempDashboards.push(new Dashboard(dashboard))
      })
      this.dashboards$.next(tempDashboards);
      this.stateChanged();
    }
  }

  //##################################################################

  saveToLocalStorage(): void {
    const dashboards: IDashboard[] = this.dashboards$.value;
    localStorage.setItem('TESTER', JSON.stringify(dashboards));
  }

  //##################################################################

  loadFromLocalStorage(): void {
    const savedDashboards = JSON.parse(localStorage.getItem('TESTER'));
    const tempDashboards: IDashboard[] = [];

    savedDashboards.forEach((savedDashboard) => {
      tempDashboards.push(new Dashboard(savedDashboard))
    })
    this.dashboards$.next(tempDashboards);
    this.dashboardUtils.setDashboardTab(0);
    this.renderDashboardByIndex(0);
    this.stateChanged();
  }

  //##################################################################

  createUUID(): string {
    return crypto.randomUUID();
  }

  //##################################################################

  stateChanged(): void {
    this.stateChanged$.next(true);
  }

  //##################################################################

  openDialog(component: ComponentType<any>, size?: 'small'|'medium'|'large', data?: Record<string, any>): void {
    this.dashboardDialog.open(component, {
      width: size ? dashboardDialogSize[size].width : dashboardDialogSize.medium.width,
      height: size ? dashboardDialogSize[size].height : dashboardDialogSize.medium.height,
      data: {
        dashboardService: this,
        ...data
      }
    })
  }

//##################################################################

}
