import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { UserService } from '../../services/user.service';
import {ProfileService} from "../../../profile/services/profile.service";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";


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
  email = '';
  password = '';
  error = '';

  constructor(
      private userService: UserService,
      private profileService: ProfileService,
      private router: Router,
      private authService: AuthService
  ) {}login() {
    this.authService.signIn({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        const token = res.token;
        const { token: _, ...userWithoutToken } = res;

        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutToken));

        this.profileService.getAll().subscribe({
          next: (profiles) => {
            console.log('Perfiles recibidos:', profiles);
            console.log('Buscando perfil con userId:', res.id);
            console.log('res:', res);

            const profile = profiles.find(p => p.userId === res.id);
            if (!profile) {
              this.error = 'No se encontró un perfil para este usuario.';
              return;
            }

            localStorage.setItem('currentProfile', JSON.stringify(profile));
            console.log('Redirigiendo a /plants...');
            this.router.navigate(['/plants']);
          },
          error: () => {
            this.error = 'Error al obtener los perfiles';
          }
        });

      },
      error: () => {
        this.error = 'Correo o contraseña incorrectos';
      }
    });

  }


}
