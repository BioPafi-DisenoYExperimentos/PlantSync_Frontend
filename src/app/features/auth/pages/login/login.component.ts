import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProfileService } from '../../../profile/services/profile.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/**
 * LoginComponent handles user authentication.
 * It provides a login form, validates credentials, and stores session data.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /** User input: email address */
  email = '';

  /** User input: password */
  password = '';

  /** Error message displayed on login failure */
  error = '';

  /**
   * Injects required services for authentication, profile loading, and routing.
   * @param userService - Service to manage user-related operations
   * @param profileService - Service to fetch user profiles
   * @param router - Angular Router for navigation
   * @param authService - Service for handling authentication
   */
  constructor(
      private userService: UserService,
      private profileService: ProfileService,
      private router: Router,
      private authService: AuthService
  ) {}

  /**
   * Attempts to sign in the user with the provided credentials.
   * If successful, stores auth token and user info in localStorage, retrieves the profile,
   * and navigates to the main application page. Displays an error otherwise.
   */
  login(): void {
    this.authService.signIn({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        const token = res.token;
        const { token: _, ...userWithoutToken } = res;

        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutToken));

        this.profileService.getAll().subscribe({
          next: (profiles) => {
            console.log('Profiles received:', profiles);
            console.log('Looking for profile with userId:', res.id);

            const profile = profiles.find(p => p.userId === res.id);
            if (!profile) {
              this.error = 'No profile found for this user.';
              return;
            }

            localStorage.setItem('currentProfile', JSON.stringify(profile));
            console.log('Redirecting to /plants...');
            this.router.navigate(['/plants']);
          },
          error: () => {
            this.error = 'Error fetching profiles';
          }
        });

      },
      error: () => {
        this.error = 'Incorrect email or password';
      }
    });
  }
}
