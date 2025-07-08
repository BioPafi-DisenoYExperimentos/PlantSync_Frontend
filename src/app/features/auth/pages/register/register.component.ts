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

  selectedPlan: 'basic' | 'premium' | 'pro' = 'basic';

  cardName = '';
  cardNumber = '';
  expiryDate = '';
  cvv = '';

  constructor(
      private userService: UserService,
      private profileService: ProfileService,
      private router: Router,
      private authService: AuthService
  ) {}

  register() {

    if (!this.name || !this.email || !this.password) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }

    if (!this.cardName || !this.cardNumber || !this.expiryDate || !this.cvv) {
      this.error = 'Por favor completa los datos de tarjeta simulados.';
      return;
    }

    this.error = '';

    this.authService.signUp({
      name: this.name,
      email: this.email,
      password: this.password,
      subscriptionPlan: this.selectedPlan
    }).subscribe({
      next: (createdUser) => {
        const userId = createdUser.id;


        localStorage.setItem('userId', userId.toString());
        localStorage.setItem('email', createdUser.email);


        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Error al registrar el usuario: ' + err.message;
      }
    });
  }
}
