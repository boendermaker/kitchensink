import { Injectable } from '@angular/core';
import { IDashboard, IDashboardWidgetContent } from '../dashboard.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Dashboard } from '../dashboard.class';
import { DashboardServiceWidgetUtils } from './dashboard.service.widgetutils.class';
import { DashboardServiceDashboardUtils } from './dashboard.service.dashboardutils.class';

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

  stateChanged$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  stateChanged_: Observable<boolean> = this.stateChanged$.asObservable();

  get dashboardCount(): number {
    return this.dashboardUtils.getTotalCount();
  }

  constructor(
  ) {}

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

  setWidgetContent(widgetContent: IDashboardWidgetContent[]): void {
    this.widgetContent = widgetContent;
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

}
