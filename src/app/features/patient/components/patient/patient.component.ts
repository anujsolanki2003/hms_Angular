import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../../services/patient.service';
import { Patient } from 'src/app/core/interfaces/patient.data';
import { AddEditDialogComponent } from 'src/app/shared/dialogs/add-edit-dialog/add-edit-dialog.component';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  displayedColumns: string[] = [
    'firstName',
    'middleName',
    'lastName',
    'email',
    'phone',
    'dob',
    'actions',
  ];

  constructor(
    private patientService: PatientService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getPatients().subscribe((patients) => {
      console.log(patients);

      this.patients = patients;
    });
  }

  openAddEditDialog(patient?: Patient): void {
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      width: '400px',
      data: { patient },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.patientService
            .updatePatient(result.id, result)
            .subscribe(() => this.loadPatients());
        } else {
          this.patientService
            .addPatient(result)
            .subscribe(() => this.loadPatients());
        }
      }
    });
  }

  openDeleteDialog(patientId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this patient?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.patientService
          .deletePatient(patientId)
          .subscribe(() => this.loadPatients());
      }
    });
  }
}
