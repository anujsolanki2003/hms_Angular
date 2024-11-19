import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RoleSelectionDialogComponent } from 'src/app/shared/components/role-selection-dialog/role-selection-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService
        .login(loginData)
        .pipe(
          catchError((error) => {
            console.error('Login failed:', error);

            this.errorMessage =
              error?.error?.message ||
              error?.error ||
              error?.message ||
              'Login failed. Please try again.';

            return of(null);
          })
        )
        .subscribe((response) => {
          if (response) {
            // Assuming the response contains the 'user' object, and 'role' is within it
            const userRoles = response.user.role;

            if (userRoles && userRoles.length === 1) {
              this.authService.storeUserRole(userRoles);
              this.router.navigate(['/dashboard']);
            } else if (userRoles && userRoles.length > 1) {
              this.openRoleSelectionDialog(userRoles);
            } else {
              console.error('No roles found for the user.');
            }
          }
        });
    }
  }

  openRoleSelectionDialog(roles: string[]): void {
    const dialogRef = this.dialog.open(RoleSelectionDialogComponent, {
      data: {
        roles: roles,
      },
    });

    dialogRef.afterClosed().subscribe((selectedRole) => {
      if (selectedRole) {
        // console.log('Selected Role:', selectedRole);

        this.authService.storeUserRole([selectedRole]);

        this.router.navigate(['/dashboard']);
      } else {
        console.log('No role selected');
        this.errorMessage = 'You must select a role before proceeding.';
      }
    });
  }
}
