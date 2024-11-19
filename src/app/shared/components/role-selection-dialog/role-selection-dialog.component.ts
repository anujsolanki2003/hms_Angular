import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-role-selection-dialog',
  templateUrl: './role-selection-dialog.component.html',
  styleUrls: ['./role-selection-dialog.component.scss'],
})
export class RoleSelectionDialogComponent {
  availableRoles: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RoleSelectionDialogComponent>
  ) {
    this.availableRoles = data.roles;
    console.log('Available Roles:', this.availableRoles);
  }

  selectRole(role: string): void {
    this.dialogRef.close(role);
  }
}
