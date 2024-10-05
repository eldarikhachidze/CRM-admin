import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainLayoutComponent} from "./main-layout.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";



@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatSidenavModule
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
