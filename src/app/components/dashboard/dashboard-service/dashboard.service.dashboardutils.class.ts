import { Dashboard } from "../dashboard.class";
import { IDashboard, IDashboardConfig } from "../dashboard.interface";
import { DashboardService } from "./dashboard.service";
import { ComponentType } from "@angular/cdk/portal";
import { DashboardCreateComponent } from "../dashboard-create/dashboard-create.component";
import { DashboardSettingsComponent } from "../dashboard-settings/dashboard-settings.component";

export class DashboardServiceDashboardUtils {

  ref: DashboardService;
  DashboardCreateComponent: ComponentType<any> = DashboardCreateComponent;
  DashboardSettingsComponent: ComponentType<any> = DashboardSettingsComponent

  constructor(
    ref: DashboardService
  ) {
    this.ref = ref;
  }

//##################################################################
  /** Opens create new dashboard modal dialog
   *  Pass custom component and data additionally
   */
  create(component?: ComponentType<any>, data?: Record<string, any>): void {
    this.ref.openDialog(component ?? DashboardCreateComponent, 'small', data);
  }

//##################################################################
  /** Opens edit dashboard modal dialog for the current rendered dashboard
   *  Pass custom component and data additionally
   */
  edit(component?: ComponentType<any>, data?: Record<string, any>): void {
    this.ref.openDialog(component ?? DashboardSettingsComponent, 'medium', data);
  }

//##################################################################
  /** Adds a new empty dashboard with a label
   *  Pass label string as param
   */
  add(label: string): void {
    const emptyDashboard: IDashboard = new Dashboard(null, label);
    if(emptyDashboard) {
      this.ref.dashboards$.next([...this.ref.dashboards$.value, emptyDashboard]);
      this.ref.stateChanged();
    }
  }

//##################################################################
  /** Removes the current rendered Dashboard */
  remove(): void {
    const id: string = this.ref.renderedDashboardId;
    if(id) {
      this.ref.dashboards$.next(this.ref.dashboards$.value.filter(r => r.id !== id));
      this.setDashboardTab(0);
      this.ref.renderDashboardByIndex(0);
      this.ref.stateChanged();
    }
  }

//##################################################################
  //** Remove a dashboard by its dashboard id */
  removeById(id: string): void {
    if(id) {
      this.ref.dashboards$.next(this.ref.dashboards$.value.filter(r => r.id !== id));
      this.setDashboardTab(0);
      this.ref.renderDashboardByIndex(0);
      this.ref.stateChanged();
    }
  }

//##################################################################
  /** Remove a dashboard by its index in the dashboard state array */
  removeByIndex(index: number): void {
    if(index) {
      this.ref.dashboards$.next(this.ref.dashboards$.value.splice(index, 1));
      this.setDashboardTab(0);
      this.ref.renderDashboardByIndex(index);
      this.ref.stateChanged();
    }
  }

//##################################################################
  /** Returns the current rendered dashboard state */
  getRendered(): IDashboard {
    const dashboard: IDashboard = this.getById(this.ref.renderedDashboardId);
    return dashboard;
  }

//##################################################################
  /** Returns a dashboard state by dashboard id */
  getById(id: string): IDashboard {
    if(id) {
      return this.ref.dashboards$.value.find(f => f.id === id);
    }
  }

//##################################################################
  /** Returns a dashboard by its array index in the dashboard array */
  getByIndex(index: number): IDashboard {
    if(index) {
      return this.ref.dashboards$.value[index];
    }else {
      return null;
    }
  }

//##################################################################
  /** Returns the array index from the dashboard by its dashboard id */
  getIndexById(id: string): number {
    return this.ref.dashboards$.value.findIndex(f => f.id === id);
  }

//##################################################################
  /** Retuns the total count of dashboards */
  getTotalCount(): number {
    return this.ref.dashboards$.value.length;
  }

//##################################################################
  //** Sets the dashboard navigation tab active by array index */
  setDashboardTab(index: number): void {
    this.ref.tabIndex$.next(index);
  }

//##################################################################
  //** Toggles the dashboard editmode on and off */
  toggleEditMode(): void {
    const dashboard = this.getRendered();
    dashboard.toggleEditMode();
    this.ref.renderDashboardById(this.ref.renderedDashboardId);
  }

//##################################################################
  //** Updates the current rendered dashboard state with a modified dashboard state */
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
  //** Updates only the dashboard config object with a modified one */
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
