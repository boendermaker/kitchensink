import { Dashboard } from "../dashboard.class";
import { IDashboard, IDashboardConfig } from "../dashboard.interface";
import { DashboardService } from "./dashboard.service";
import { ComponentType } from "@angular/cdk/portal";

export class DashboardServiceDashboardUtils {

  ref: DashboardService;

  constructor(
    ref: DashboardService
  ) {
    this.ref = ref;
  }

//##################################################################

  create(component: ComponentType<any>, data?: Record<string, any>): void {
    this.ref.openDialog(component, 'small', data);
  }

//##################################################################

  edit(component: ComponentType<any>, data?: Record<string, any>): void {
    this.ref.openDialog(component, 'medium', data);
  }

//##################################################################

  add(label: string): void {
    const emptyDashboard: IDashboard = new Dashboard(null, label);
    if(emptyDashboard) {
      this.ref.dashboards$.next([...this.ref.dashboards$.value, emptyDashboard]);
      this.ref.stateChanged();
    }
  }

//##################################################################

  remove(): void {
    const id: string = this.ref.renderedDashboardId;
    if(id) {
      this.ref.dashboards$.next(this.ref.dashboards$.value.filter(r => r.id !== id));
      this.ref.stateChanged();
    }
  }

//##################################################################

  removeById(id: string): void {
    if(id) {
      this.ref.dashboards$.next(this.ref.dashboards$.value.filter(r => r.id !== id));
      this.ref.stateChanged();
    }
  }

//##################################################################

  removeByIndex(index: number): void {
    if(index) {
      this.ref.dashboards$.next(this.ref.dashboards$.value.splice(index, 1));
      this.ref.stateChanged();
    }
  }

//##################################################################

  getRendered(): IDashboard {
    const dashboard: IDashboard = this.getById(this.ref.renderedDashboardId);
    return dashboard;
  }

//##################################################################

  getById(id: string): IDashboard {
    if(id) {
      return this.ref.dashboards$.value.find(f => f.id === id);
    }
  }

//##################################################################

  getByIndex(index: number): IDashboard {
    if(index) {
      return this.ref.dashboards$.value[index];
    }else {
      return null;
    }
  }

//##################################################################

  getTotalCount(): number {
    return this.ref.dashboards$.value.length;
  }

//##################################################################

  toggleEditMode(): void {
    const dashboard = this.getRendered();
    dashboard.toggleEditMode();
    this.ref.renderDashboardById(this.ref.renderedDashboardId);
  }

//##################################################################

  updateDashboard(changedDashboard: IDashboard): void {
    const id: string = this.ref.renderedDashboardId;
    if(id) {
      this.ref.dashboards$.next([...this.ref.dashboards$.value.map((dashboard: IDashboard) => {
        if(dashboard.id === id) {
          dashboard = {...dashboard, ...changedDashboard};
        }
        return dashboard;
      })])
      this.ref.renderDashboardById(id);
    }
  }

//##################################################################

  updateConfig(config: IDashboardConfig): void {
    const id: string = this.ref.renderedDashboardId;
    if(id) {
      this.ref.dashboards$.next([...this.ref.dashboards$.value.map((dashboardItem: IDashboard) => {
        if(dashboardItem.id === id) {
          dashboardItem.config = {...dashboardItem.config, ...config};
        }
        return dashboardItem;
      })])
      this.ref.renderDashboardById(id);
    }
  }

//##################################################################

}
