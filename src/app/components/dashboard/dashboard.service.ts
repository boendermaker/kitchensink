import { Injectable } from '@angular/core';
import { IDashboard, IDashboardConfig, IDashboardWidget } from './dashboard.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dashboard } from './dashboard.class';
import { Widget } from './widget.class';
import { GridsterItem } from 'angular-gridster2';

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
    const emptyDashboard: IDashboard = new Dashboard(label);
    if(emptyDashboard) {
      this.dashboards$.next([...this.dashboards$.value, emptyDashboard]);
    }
  }

  //##################################################################

  addEmptyWidget(): void {
    const dashboard = this.getDashboardById(this.renderedDashboardId);
    const config: GridsterItem = dashboard.config.api.getFirstPossiblePosition({x: 0, y: 0, rows: 1, cols: 1});
    const emptyWidget: IDashboardWidget = new Widget(config);
    dashboard?.widgets.push(emptyWidget);
    this.renderDashboardById(this.renderedDashboardId);
  }

  //##################################################################

  removeDashboardById(id: string): void {
    if(id) {
      this.dashboards$.next(this.dashboards$.value.filter(r => r.id !== id));
    }
  }

  //##################################################################

  getDashboardById(id: string): IDashboard {
    return this.dashboards$.value.find(f => f.id === id);
  }

  //##################################################################

  getDashboardByIndex(index: number): IDashboard {
    return this.dashboards$.value[index];
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

  saveToLocalStorage(): void {
    const dashboards: IDashboard[] = this.dashboards$.value;
    localStorage.setItem('TESTER', JSON.stringify(dashboards));
  }

  //##################################################################

  loadFromLocalStorage(): void {
    const dashboards = JSON.parse(localStorage.getItem('TESTER'));
    this.dashboards$.next(dashboards);
  }

  //##################################################################


}
