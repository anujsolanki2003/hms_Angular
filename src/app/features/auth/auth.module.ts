import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent],

  imports: [CommonModule, SharedModule, AuthRoutingModule],
  exports: [LoginComponent],
})
export class AuthModule {}
