import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ProfileService} from "../../../profile/services/profile.service";

import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';
  selectedPlan: 'basic' | 'premium' | 'pro' = 'basic';

  constructor(
      private userService: UserService,
      private profileService: ProfileService,
      private router: Router,
      private authService: AuthService
  ) {
  }

  register() {
    this.authService.signUp({
      name: this.name,
      email: this.email,
      password: this.password,
      subscriptionPlan: this.selectedPlan
    }).subscribe({
      next: () => {
        this.success = 'Registro exitoso. Redirigiendo al login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = 'Error al registrar el usuario: ' + err.message;
      }
    });
  }
}