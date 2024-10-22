import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableRoutingModule} from './table-routing.module';
import {TableComponent} from "./table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AddOrEditTableComponent} from './components/add-or-edit-table/add-or-edit-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    TableComponent,
    AddOrEditTableComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class TableModule {
}
