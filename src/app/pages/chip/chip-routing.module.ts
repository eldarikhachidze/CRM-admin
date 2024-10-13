import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChipComponent} from "./chip.component";
import {AddOrEditChipComponent} from "./add-or-edit-chip/add-or-edit-chip.component";

const routes: Routes = [
  {
    path: '',
    component: ChipComponent
  },
  {
    path: 'create',
    component: AddOrEditChipComponent
  },
  {
    path: 'edit/:id',
    component: AddOrEditChipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChipRoutingModule { }
