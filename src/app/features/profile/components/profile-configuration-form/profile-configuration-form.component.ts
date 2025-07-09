import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { UserService } from "../../../auth/services/user.service";
import { Profile } from "../../model/profile.entity";
import { User } from "../../../auth/model/user.entity";

// Angular Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";

/**
 * ConfigurationFormComponent allows a user to update their profile and account information,
 * including subscription plan, name, and email address.
 */
@Component({
  selector: 'app-configuration-form',
  templateUrl: './profile-configuration-form.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatLabel,
    ReactiveFormsModule
  ],
  styleUrls: ['./profile-configuration-form.component.css']
})
export class ConfigurationFormComponent implements OnInit {
  /** Reactive form group for profile and user info */
  form!: FormGroup;

  /** Current user object from localStorage */
  currentUser!: User;

  /** ID of the current user */
  currentUserId!: number;

  /** ID of the user's profile */
  profileId!: number;

  /**
   * Injects required services for profile and user management, and form building.
   * @param fb - FormBuilder for initializing the reactive form
   * @param profileService - Service to fetch and update profile data
   * @param userService - Service to fetch and update user data
   */
  constructor(
      private fb: FormBuilder,
      private profileService: ProfileService,
      private userService: UserService
  ) {}

  /**
   * Initializes the component by building the form and loading user and profile data.
   */
  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      console.error('No user found in localStorage');
      return;
    }

    this.currentUser = JSON.parse(storedUser);
    this.currentUserId = this.currentUser.id;

    this.form = this.fb.group({
      personName: ['', Validators.required],
      subscriptionPlan: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadData();
  }

  /**
   * Loads the user's profile and email from the backend and populates the form.
   * Also stores the profile locally.
   */
  loadData(): void {
    this.profileService.getById(this.currentUserId).subscribe({
      next: (profile: Profile) => {
        this.profileId = profile.id;
        localStorage.setItem('currentProfile', JSON.stringify(profile));

        this.form.patchValue({
          personName: profile.personName,
          subscriptionPlan: profile.subscriptionPlan?.toUpperCase()
        });
      },
      error: (err) => {
        console.error('Error loading profile:', err);
      }
    });

    this.userService.getById(this.currentUserId).subscribe({
      next: (user: User) => {
        this.form.patchValue({ email: user.email });
      },
      error: (err) => {
        console.error('Error loading user:', err);
      }
    });
  }

  /**
   * Submits the updated profile and user email to their respective services.
   * Also performs validation before sending the data.
   */
  onSubmit(): void {
    if (this.form.invalid) return;

    const { personName, subscriptionPlan, email } = this.form.value;

    const updatedProfile = new Profile({
      id: this.profileId,
      userId: this.currentUserId,
      personName,
      subscriptionPlan
    });

    this.profileService.update(this.profileId, updatedProfile).subscribe({
      next: () => console.log('Profile updated successfully'),
      error: (err) => console.error('Error updating profile:', err)
    });

    const updatedUser: User = {
      id: this.currentUser.id,
      email,
      password: this.currentUser.password
    };

    this.userService.updateUser(this.currentUser.id, updatedUser).subscribe({
      next: () => console.log('Email updated successfully'),
      error: (err) => console.error('Error updating email:', err)
    });
  }
}
