import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NewDoctorComponent } from './views/new-doctor/new-doctor.component';
import { NewInternComponent } from './views/new-intern/new-intern.component';
import { UpdateDoctorComponent } from './views/update-doctor/update-doctor.component'
import { UpdateInternComponent } from './views/update-intern/update-intern.component'


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new-doctor', component: NewDoctorComponent },
  { path: 'new-intern', component: NewInternComponent },
  { path: 'update-doctor/:id', component: UpdateDoctorComponent },
  { path: 'update-intern/:id', component: UpdateInternComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, DashboardComponent, NewDoctorComponent, NewInternComponent, UpdateDoctorComponent, UpdateInternComponent]