import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { TableformComponent } from './views/tableform/tableform.component';
import { DrawermodalComponent } from './views/drawermodal/drawermodal.component';
import { DatatableComponent } from './views/datatable/datatable.component';
import { VirtualscrollComponent } from './views/virtualscroll/virtualscroll.component';
import { DynamicformComponent } from './views/dynamicform/dynamicform.component';
import { BlocklyComponent } from './views/blockly/blockly.component';
import { RecursiveComponent } from './views/recursive/recursive.component';
import { RecursiveLazyComponent } from './views/recursivelazy/recursivelazy.component';
import { ChiplistComponent } from './views/chiplist/chiplist.component';
import { WebcomponentComponent } from '@app/views/webcomponent/webcomponent.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'tableform', component: TableformComponent },
  { path: 'drawermodal', component: DrawermodalComponent },
  { path: 'datatable', component: DatatableComponent },
  { path: 'virtualscroll', component: VirtualscrollComponent },
  { path: 'dynamicform', component: DynamicformComponent },
  { path: 'blockly', component: BlocklyComponent },
  { path: 'recursive', component: RecursiveComponent },
  { path: 'recursivelazy', component: RecursiveLazyComponent },
  { path: 'chiplist', component: ChiplistComponent },
  { path: 'webcomponent', component: WebcomponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
