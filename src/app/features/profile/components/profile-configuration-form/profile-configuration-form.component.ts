import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { UserService} from "../../../auth/services/user.service";
import { Profile} from "../../model/profile.entity";
import { User} from "../../../auth/model/user.entity";

import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";

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
  form!: FormGroup;
  currentUser!: User;
  currentUserId!: number;
  profileId!: number;

  constructor(
      private fb: FormBuilder,
      private profileService: ProfileService,
      private userService: UserService
  ) {}

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
    console.log(this.form.value);

    this.userService.getById(this.currentUserId).subscribe({
      next: (user: User) => {
        this.form.patchValue({ email: user.email });
      },
      error: (err) => {
        console.error('Error loading user:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { personName, subscriptionPlan, email } = this.form.value;

    const updatedProfile = new Profile({
      id: this.profileId,
      userId: this.currentUserId,
      personName,
      subscriptionPlan
    });
    console.log({
      id: this.profileId,
      userId: this.currentUserId,
      personName,
      subscriptionPlan
    });


    console.log('Enviando perfil al backend:', updatedProfile);

    this.profileService.update(this.profileId, updatedProfile).subscribe({
      next: () => console.log('Perfil actualizado correctamente'),
      error: (err) => console.error('Error actualizando perfil:', err)
    });

    const updatedUser: User = {
      id: this.currentUser.id,
      email,
      password: this.currentUser.password
    };

    this.userService.updateUser(this.currentUser.id, updatedUser).subscribe({
      next: () => console.log('Correo actualizado correctamente'),
      error: (err) => console.error('Error actualizando correo:', err)
    });
  }
}