import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Sections of the application that support translated labels.
 */
export type Section = 'plants' | 'guides' | 'tasks' | 'chatbot' | 'config';

/**
 * Interface for section labels that can be translated.
 */
interface SectionLabels {
    title: string;
    addPlant?: string;
}

/**
 * Dictionary structure holding labels for each section in supported languages.
 */
type Labels = {
    plants: SectionLabels;
    guides: SectionLabels;
    tasks: SectionLabels;
    chatbot: SectionLabels;
    config: SectionLabels;
};

/**
 * LanguageService manages application language state and provides localized labels
 * for defined sections. It uses a BehaviorSubject to support reactive language changes.
 */
@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    /**
     * BehaviorSubject holding the current language state ('es' or 'en').
     */
    private langSubject = new BehaviorSubject<'es' | 'en'>(
        (localStorage.getItem('lang') as 'es' | 'en') || 'es'
    );

    /**
     * Observable for components to subscribe to language changes.
     */
    lang$ = this.langSubject.asObservable();

    /**
     * Internal label dictionary for Spanish and English languages.
     */
    private labels: Record<'es' | 'en', Labels> = {
        es: {
            plants: { title: 'Mis Plantas', addPlant: 'Agregar Planta' },
            guides: { title: 'Guías' },
            tasks: { title: 'Tareas' },
            chatbot: { title: 'RootBot' },
            config: { title: 'Configuración' }
        },
        en: {
            plants: { title: 'My Plants', addPlant: 'Add Plant' },
            guides: { title: 'Guides' },
            tasks: { title: 'Tasks' },
            chatbot: { title: 'RootBot' },
            config: { title: 'Settings' }
        }
    };

    /**
     * Sets the current language and updates local storage.
     * @param lang The new language code ('es' or 'en').
     */
    setLang(lang: 'es' | 'en') {
        this.langSubject.next(lang);
        localStorage.setItem('lang', lang);
    }

    /**
     * Returns the currently selected language.
     * @returns The current language ('es' or 'en').
     */
    getLang(): 'es' | 'en' {
        return this.langSubject.value;
    }

    /**
     * Retrieves a translated label for a given section and field.
     * @param section The section from which to get the label.
     * @param field The field name to translate (e.g. 'title', 'addPlant').
     * @returns The translated string if found, otherwise an empty string.
     */
    getLabel(section: Section, field: keyof SectionLabels): string {
        const lang = this.getLang();
        return this.labels[lang][section][field] ?? '';
    }
}
