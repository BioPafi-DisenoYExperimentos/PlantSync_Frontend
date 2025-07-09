import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from "../../services/language.service";

/**
 * SidebarLayoutComponent is a standalone layout component that provides
 * a vertical sidebar with navigation links and language toggling.
 */
@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css']
})
export class SidebarLayoutComponent {
  /**
   * Current selected language code ('es' or 'en').
   */
  lang: 'es' | 'en';

  /**
   * Label translations for sidebar items in Spanish and English.
   */
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

  /**
   * Constructs the component, initializes the current language and subscribes to language changes.
   * @param router Angular Router for navigation.
   * @param languageService Service to manage app language.
   */
  constructor(
      private router: Router,
      private languageService: LanguageService
  ) {
    this.languageService.lang$.subscribe(lang => {
      this.lang = lang;
    });

    this.lang = this.languageService.getLang();
  }

  /**
   * Clears user session and navigates to the login page.
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  /**
   * Toggles the current language between Spanish and English.
   */
  toggleLang(): void {
    const newLang = this.lang === 'es' ? 'en' : 'es';
    this.languageService.setLang(newLang);
  }
}
