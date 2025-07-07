import { Component, OnInit } from '@angular/core';
import { ConfigurationFormComponent } from '../../components/profile-configuration-form/profile-configuration-form.component';
import { LanguageService} from "../../../../shared/services/language.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configuration-page',
  standalone: true,
  imports: [ConfigurationFormComponent],
  templateUrl: './configuration-page.component.html',
  styleUrl: './configuration-page.component.css'
})
export class ConfigurationPageComponent implements OnInit {
  title: string = '';
  darkModeLabel: string = '';
  private langSub?: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.body.classList.add('dark-mode');
    }

    this.langSub = this.languageService.lang$.subscribe(lang => {
      this.title = lang === 'es' ? 'Configuración de perfil' : 'Profile Settings';
      this.darkModeLabel = lang === 'es' ? 'Cambiar a modo oscuro' : 'Toggle Dark Mode';
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  }
}
