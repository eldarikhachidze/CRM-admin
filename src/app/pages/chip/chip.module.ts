import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipRoutingModule } from './chip-routing.module';
import {ChipComponent} from "./chip.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { AddOrEditChipComponent } from './add-or-edit-chip/add-or-edit-chip.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    ChipComponent,
    AddOrEditChipComponent
  ],
  imports: [
    CommonModule,
    ChipRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class ChipModule { }
