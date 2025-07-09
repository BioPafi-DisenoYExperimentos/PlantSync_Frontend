import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigurationFormComponent } from '../../components/profile-configuration-form/profile-configuration-form.component';
import { LanguageService } from "../../../../shared/services/language.service";
import { Subscription } from 'rxjs';

/**
 * ConfigurationPageComponent displays the user profile configuration page,
 * including form fields and settings like dark mode and language-aware labels.
 */
@Component({
  selector: 'app-configuration-page',
  standalone: true,
  imports: [ConfigurationFormComponent],
  templateUrl: './configuration-page.component.html',
  styleUrl: './configuration-page.component.css'
})
export class ConfigurationPageComponent implements OnInit, OnDestroy {
  /** Title of the configuration section */
  title: string = '';

  /** Label for the dark mode toggle */
  darkModeLabel: string = '';

  /** Title for the contact/help section */
  contactTitle: string = '';

  /** Descriptive text for the contact/help section */
  contactDescription: string = '';

  /** Subscription to the language service observable */
  private langSub?: Subscription;

  /**
   * Injects the LanguageService for dynamic internationalization.
   * @param languageService - Service that provides the current language and translations
   */
  constructor(private languageService: LanguageService) {}

  /**
   * Initializes the component, sets dark mode if previously enabled,
   * and subscribes to language changes to update UI labels accordingly.
   */
  ngOnInit(): void {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.body.classList.add('dark-mode');
    }

    this.langSub = this.languageService.lang$.subscribe(lang => {
      this.title = lang === 'es' ? 'Configuración de perfil' : 'Profile Settings';
      this.darkModeLabel = lang === 'es' ? 'Cambiar a modo oscuro' : 'Toggle Dark Mode';

      // Contact/help section translations
      this.contactTitle = lang === 'es' ? 'Contáctanos' : 'Contact Us';
      this.contactDescription = lang === 'es'
          ? '¿Tienes dudas o problemas? Comunícate con nuestro equipo de soporte:'
          : 'Have questions or issues? Reach out to our support team:';
    });
  }

  /**
   * Unsubscribes from language updates when the component is destroyed to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  /**
   * Toggles dark mode by adding/removing a CSS class on the document body.
   * Stores the preference in localStorage.
   */
  toggleDarkMode(): void {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  }
}
