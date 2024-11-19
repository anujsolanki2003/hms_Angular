import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RoleSelectionDialogComponent } from './components/role-selection-dialog/role-selection-dialog.component';
import { MaterialModule } from './material/material/material.module';
import { AddEditDialogComponent } from './dialogs/add-edit-dialog/add-edit-dialog.component';
import { DeleteConfirmationDialogComponent } from './dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  declarations: [
    RoleSelectionDialogComponent,
    AddEditDialogComponent,
    DeleteConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule, MaterialModule],
})
export class SharedModule {}
