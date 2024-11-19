import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/core/interfaces/patient.data';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss'],
})
export class AddEditDialogComponent implements OnInit {
  patientForm!: FormGroup;
  patient: Patient = {
    id: 0,
    first_Name: '',
    middle_Name: '',
    last_Name: '',
    email: '',
    phone: '',
    dob: '',
    Clinic_Id: 1, // Set default Clinic_Id (change as needed)
    Practioner_Id: 0, // Set default Practioner_Id
    user_id: 0, // Set default user_id (change as needed)
  };

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patient?: Patient },
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialize the form and fill in values from the dialog data
    this.patientForm = this.fb.group({
      firstName: [this.data?.patient?.first_Name || '', Validators.required],
      middleName: [this.data?.patient?.middle_Name || '', Validators.required],
      lastName: [this.data?.patient?.last_Name || '', Validators.required],
      email: [
        this.data?.patient?.email || '',
        [Validators.required, Validators.email],
      ],
      phone: [this.data?.patient?.phone || '', Validators.required],
      dob: [this.data?.patient?.dob || '', Validators.required],
    });

    // If there's data from the dialog, update the patient object with that data
    if (this.data?.patient) {
      this.patient = { ...this.data.patient };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.patientForm.valid) {
      // Merge form values with patient data (including extra fields)
      const updatedPatient: Patient = {
        id: this.data?.patient?.id || 0,
        Clinic_Id: this.patient.Clinic_Id, // Include Clinic_Id
        Practioner_Id: this.patient.Practioner_Id, // Include Practioner_Id
        user_id: this.patient.user_id, // Include user_id
        ...this.patientForm.value, // Merge form values (firstName, middleName, etc.)
      };
      this.dialogRef.close(updatedPatient);
    }
  }
}
