import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css']
})
export class SidebarLayoutComponent {
  lang: 'es' | 'en';

  labels = {
    es: {
      plants: 'Mis Plantas',
      guides: 'Guías',
      tasks: 'Tareas',
      chatbot: 'RootBot',
      config: 'Configuración',
      logout: 'Cerrar Sesión'
    },
    en: {
      plants: 'My Plants',
      guides: 'Guides',
      tasks: 'Tasks',
      chatbot: 'RootBot',
      config: 'Settings',
      logout: 'Log Out'
    }
  };

  constructor(
      private router: Router,
      private languageService: LanguageService
  ) {
    // Actualiza la propiedad local cada vez que cambia el idioma global
    this.languageService.lang$.subscribe(lang => {
      this.lang = lang;
    });

    // Inicializa con el valor actual
    this.lang = this.languageService.getLang();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  toggleLang(): void {
    const newLang = this.lang === 'es' ? 'en' : 'es';
    this.languageService.setLang(newLang); // <--- Asegurado aquí
  }
}
