import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './components/patient/patient.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PatientComponent],
  imports: [CommonModule, PatientRoutingModule, SharedModule],
})
export class PatientModule {}
