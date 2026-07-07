import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ProfileService } from "../../../profile/services/profile.service";
import { AuthService } from "../../services/auth.service";

/**
 * RegisterComponent handles the user registration process, including
 * user credentials, subscription plan selection, and simulated payment details.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  /** User's full name */
  name = '';

  /** Email for account creation */
  email = '';

  /** Account password */
  password = '';

  /** Age of the user */
  age: number | null = null;

  /** Gender of the user */
  gender = '';

  /** Error message for validation or registration failure */
  error = '';

  /** Selected subscription plan */
  selectedPlan: 'basic' | 'premium' | 'pro' = 'basic';

  /** Simulated credit card: name on card */
  cardName = '';

  /** Simulated credit card: number */
  cardNumber = '';

  /** Simulated credit card: expiration date */
  expiryDate = '';

  /** Simulated credit card: CVV code */
  cvv = '';

  /**
   * Injects required services for user management, profile handling, navigation, and authentication.
   * @param userService - Handles user-related operations (not used here directly)
   * @param profileService - Manages profile creation (placeholder for possible future use)
   * @param router - Used to navigate after successful registration
   * @param authService - Service for signing up the user
   */
  constructor(
      private userService: UserService,
      private profileService: ProfileService,
      private router: Router,
      private authService: AuthService
  ) {}

  /**
   * Validates the input fields, submits registration data via the AuthService,
   * stores the new user in localStorage, and redirects to the login page.
   * Displays error messages for missing fields or API errors.
   */
  register(): void {
    // Validate user information
    if (!this.name || !this.email || !this.password || this.age === null || !this.gender) {
      this.error = 'Please complete all required fields.';
      return;
    }

    // Validate simulated payment data (only if not basic plan)
    if (this.selectedPlan !== 'basic') {
      if (!this.cardName || !this.cardNumber || !this.expiryDate || !this.cvv) {
        this.error = 'Please complete the simulated card information.';
        return;
      }
    }

    this.error = '';

    // Call AuthService to register the user
    this.authService.signUp({
      name: this.name,
      email: this.email,
      password: this.password,
      subscriptionPlan: this.selectedPlan,
      age: this.age,
      gender: this.gender
    }).subscribe({
      next: (createdUser) => {
        const userId = createdUser.id;

        // Save user information locally (temporary simulation)
        localStorage.setItem('userId', userId.toString());
        localStorage.setItem('email', createdUser.email);

        // Redirect to login after successful registration
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Failed to register user: ' + err.message;
      }
    });
  }
}
