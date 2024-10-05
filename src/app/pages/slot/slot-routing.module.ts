import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SlotComponent} from "./slot.component";
import {AddOrEditComponent} from "./add-or-edit/add-or-edit.component";

const routes: Routes = [
  {
    path: '',
    component: SlotComponent,
  },
  {
    path: 'create',
    component: AddOrEditComponent,
  },
  {
    path: 'edit/:id',
    component: AddOrEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotRoutingModule { }
