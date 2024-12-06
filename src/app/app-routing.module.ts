import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from "./core/guards/login.guard";
import {AuthGuard} from "./core/guards/auth.guard";
import {MainLayoutComponent} from "./features/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'slot',
        loadChildren: () => import('./pages/slot/slot.module').then(m => m.SlotModule),
      },
      {
        path: 'chip',
        loadChildren: () => import('./pages/chip/chip.module').then(m => m.ChipModule),
      },
      {
        path: 'table',
        loadChildren: () => import('./pages/table/table.module').then(m => m.TableModule),
      },
      {
        path: 'customer',
        loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule),
      }
    ],
  },

  {path: '**', redirectTo: 'auth/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
