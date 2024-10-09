import { Routes } from '@angular/router';
import { VehicleTableComponent } from './vehicle-table/vehicle-table.component';

export const routes: Routes = [
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleTableComponent }
];