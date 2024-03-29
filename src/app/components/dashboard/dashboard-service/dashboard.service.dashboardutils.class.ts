import { Dashboard } from "../dashboard.class";
import { IDashboard, IDashboardConfig } from "../dashboard.interface";
import { DashboardService } from "./dashboard.service";

export class DashboardServiceDashboardUtils {

  ref: DashboardService;

  constructor(ref: DashboardService) {
    this.ref = ref;
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
    return this.getById(this.ref.renderedDashboardId);
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

  updateDashboardConfig(id: string, config: IDashboardConfig): void {
    this.ref.dashboards$.next([...this.ref.dashboards$.value.map((dashboardItem: IDashboard) => {
      if(dashboardItem.id === id) {
        dashboardItem.config = {...dashboardItem.config, ...config};
      }
      return dashboardItem;
    })])

    this.ref.renderDashboardById(id);
  }

//##################################################################

}
