import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/features/user/states/selectors/user.selector';
import { User } from 'src/app/core/interfaces/user.data';
import { MatDialog } from '@angular/material/dialog';
import { RoleSelectionDialogComponent } from 'src/app/shared/components/role-selection-dialog/role-selection-dialog.component';
import { loadUserById } from 'src/app/features/user/states/actions/user.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userRole: string | null = null;
  userEmail: string | null = null;
  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userRole = this.authService.getUserRole();
    this.userRole = userRole && userRole.length > 0 ? userRole[0] : null;

    const userId = this.authService.getUserId();
    this.userId = userId ? parseInt(userId, 10) : null;

    if (this.userId) {
      this.store.dispatch(loadUserById({ id: this.userId }));
    }

    this.store.select(selectUser).subscribe((user: User | null) => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = null;
      }
    });
  }

  onRoleSelect(): void {
    if (this.userId) {
      this.store.select(selectUser).subscribe((user: User | null) => {
        if (user && user.role) {
          this.openRoleSelectionDialog(user.role);
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

    dialogRef.afterClosed().subscribe((selectedRole: string) => {
      if (selectedRole) {
        // console.log('Selected Role:', selectedRole);

        localStorage.setItem('userRole', selectedRole);

        this.userRole = selectedRole;
      } else {
        console.log('No role selected');
      }
    });
  }

  onLogout(): void {
    console.log('Logging out');
    this.authService.clearStorage();
    this.authService.logout();
  }
}
