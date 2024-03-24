import { Injectable } from '@angular/core';
import { IDashboard, IDashboardConfig, IDashboardWidget, IDashboardWidgetComponent, IDashboardWidgetConfig, defaultWidgetConfig } from './dashboard.interface';
import { dashboardWidgets } from './widgets';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dashboard } from './dashboard.class';
import { Widget } from './widget.class';

@Injectable()
export class DashboardService {

  dashboards$: BehaviorSubject<IDashboard[]> = new BehaviorSubject([]);
  dashboards_: Observable<IDashboard[]> = this.dashboards$.asObservable();
  dashboards: IDashboard[] = [];

  renderedDashboard$: BehaviorSubject<IDashboard> = new BehaviorSubject(null);
  renderedDashboard_: Observable<IDashboard> = this.renderedDashboard$.asObservable();
  renderedDashboardId: string = '';

  get dashboardCount(): number {
    return this.getDashboardTotalCount();
  }

  constructor() { }

  //##################################################################

  addEmptyDashboard(label: string): void {
    const emptyDashboard: IDashboard = new Dashboard(null, label);
    if(emptyDashboard) {
      this.dashboards$.next([...this.dashboards$.value, emptyDashboard]);
    }
  }

  //##################################################################

   addWidget(widgetKey: string) {
    const dashboard = this.getDashboardById(this.renderedDashboardId);
    const config: IDashboardWidgetConfig = dashboard.config.api.getFirstPossiblePosition(defaultWidgetConfig);
    const newWidgetState: IDashboardWidget = {
      id: null,
      label: '---',
      widgetConfig: defaultWidgetConfig,
      widgetComponentKey: widgetKey,
      widgetComponentConfig: {}
    }

    const newWidget: IDashboardWidget = new Widget(newWidgetState);

    dashboard?.widgets.push(newWidget);
    this.renderDashboardById(this.renderedDashboardId);
  }

  //##################################################################

  getAvailableWidgetKeys(): string[] {
    return Object.keys(dashboardWidgets);
  }

  //##################################################################

  getAvailableWidgetByKey(widgetKey: string): IDashboardWidgetComponent {
    if(dashboardWidgets.hasOwnProperty(widgetKey)) {
      return dashboardWidgets[widgetKey];
    }
  }

  //##################################################################

  removeDashboardById(id: string): void {
    if(id) {
      this.dashboards$.next(this.dashboards$.value.filter(r => r.id !== id));
    }
  }

  //##################################################################

  getDashboardById(id: string): IDashboard {
    if(id) {
      return this.dashboards$.value.find(f => f.id === id);
    }
  }

  //##################################################################

  getDashboardByIndex(index: number): IDashboard {
    if(index) {
      return this.dashboards$.value[index];
    }
  }

  //##################################################################

  getDashboardTotalCount(): number {
    return this.dashboards$.value.length;
  }

  //##################################################################

  toggleEditMode(): void {
    const dashboard = this.getDashboardById(this.renderedDashboardId);
    dashboard.toggleEditMode();
    this.renderDashboardById(this.renderedDashboardId);
  }

  //##################################################################

  updateDashboardConfig(id: string, config: IDashboardConfig): void {
    this.dashboards$.next([...this.dashboards$.value.map((dashboardItem: IDashboard) => {
      if(dashboardItem.id === id) {
        dashboardItem.config = {...dashboardItem.config, ...config};
      }
      return dashboardItem;
    })])

    this.renderDashboardById(id);
  }

  //##################################################################

  renderDashboardById(id: string): void {
    this.renderedDashboardId = id;
    const dashboard = this.dashboards$.value.find(f => f.id === id);
    this.renderedDashboard$.next(dashboard);
  }

  //##################################################################

  renderDashboardByIndex(index: number): void {
    const dashboard = this.dashboards$.value[index];
    this.renderedDashboardId = dashboard?.id;
    this.renderedDashboard$.next(dashboard);
  }

  //##################################################################

  createUUID(): string {
    return crypto.randomUUID();
  }

  //##################################################################

  getDashboardStateAsJSON() {
    const dashboards: IDashboard[] = this.dashboards$.value;
    return JSON.stringify(dashboards);
  }

  //##################################################################

  setDashboardStateFromJSON(dashboards: IDashboard[]) {
    if(dashboards.length > 0) {
      const tempDashboards: IDashboard[] = [];

      dashboards.forEach((dashboard) => {
        tempDashboards.push(new Dashboard(dashboard))
      })
      this.dashboards$.next(tempDashboards);
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
  }

  //##################################################################


}
