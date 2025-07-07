import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Secciones que manejan textos
export type Section = 'plants' | 'guides' | 'tasks' | 'chatbot' | 'config';

// Campos que pueden traducirse por sección
interface SectionLabels {
    title: string;
    addPlant?: string;
}

// Diccionario por sección
type Labels = {
    plants: SectionLabels;
    guides: SectionLabels;
    tasks: SectionLabels;
    chatbot: SectionLabels;
    config: SectionLabels;
};

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private langSubject = new BehaviorSubject<'es' | 'en'>(
        (localStorage.getItem('lang') as 'es' | 'en') || 'es'
    );

    lang$ = this.langSubject.asObservable();

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

    setLang(lang: 'es' | 'en') {
        this.langSubject.next(lang);
        localStorage.setItem('lang', lang);
    }

    getLang(): 'es' | 'en' {
        return this.langSubject.value;
    }

    getLabel(section: Section, field: keyof SectionLabels): string {
        const lang = this.getLang();
        return this.labels[lang][section][field] ?? '';
    }
}
