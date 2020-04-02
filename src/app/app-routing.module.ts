import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllStatsTableComponent } from './components/all-stats-table/all-stats-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'table-all-locations', component: AllStatsTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }