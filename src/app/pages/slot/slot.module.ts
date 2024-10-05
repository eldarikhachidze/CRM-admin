import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotRoutingModule } from './slot-routing.module';
import { SlotComponent } from './slot.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    SlotComponent,
    AddOrEditComponent
  ],
  imports: [
    CommonModule,
    SlotRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatSelectModule,
    MatListModule
  ]
})
export class SlotModule { }
