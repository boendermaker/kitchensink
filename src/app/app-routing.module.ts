import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { TableformComponent } from './views/tableform/tableform.component';
import { DrawermodalComponent } from './views/drawermodal/drawermodal.component';
import { DatatableComponent } from './views/datatable/datatable.component';
import { VirtualscrollComponent } from './views/virtualscroll/virtualscroll.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'tableform', component: TableformComponent },
  { path: 'drawermodal', component: DrawermodalComponent },
  { path: 'datatable', component: DatatableComponent },
  { path: 'virtualscroll', component: VirtualscrollComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
