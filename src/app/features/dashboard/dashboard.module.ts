import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PatientModule } from '../patient/patient.module';

@NgModule({
  declarations: [HomeComponent, SidebarComponent, NavbarComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, PatientModule],

  exports: [HomeComponent],
})
export class DashboardModule {}
