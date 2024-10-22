import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableComponent} from "./table.component";
import {AddOrEditTableComponent} from "./components/add-or-edit-table/add-or-edit-table.component";

const routes: Routes = [
  {
    path: '',
    component: TableComponent
  },
  {
    path: 'create',
    component: AddOrEditTableComponent
  },
  {
    path: 'edit/:id',
    component: AddOrEditTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule {
}
