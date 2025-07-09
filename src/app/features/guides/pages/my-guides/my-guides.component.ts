import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuidesService } from '../../services/guides.service';
import { Guide } from '../../model/guide.model';
import { LanguageService } from "../../../../shared/services/language.service";
import { Subscription } from 'rxjs';

/**
 * MyGuidesComponent displays a list of plant care guides for the user.
 * It also updates the section title dynamically based on the selected language.
 */
@Component({
  selector: 'app-mis-guias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-guides.component.html',
  styleUrls: ['./my-guides.component.css']
})
export class MyGuidesComponent implements OnInit, OnDestroy {
  /** List of available guides fetched from the API */
  guides: Guide[] = [];

  /** Translated title for the guides section */
  title: string = '';

  /** Subscription to the language change observable */
  private langSub?: Subscription;

  /**
   * Injects services for fetching guides and handling multilingual labels.
   * @param guideService - Service to retrieve the list of guides
   * @param languageService - Service to manage translations and language switching
   */
  constructor(
      private guideService: GuidesService,
      private languageService: LanguageService
  ) {}

  /**
   * Lifecycle hook that runs on component initialization.
   * Loads the guides and sets the initial title based on the current language.
   * Subscribes to language changes to update the title dynamically.
   */
  ngOnInit(): void {
    this.guideService.getGuides().subscribe(data => this.guides = data);

    // Set initial translated title
    this.title = this.languageService.getLabel('guides', 'title');

    // Subscribe to language changes to update the title reactively
    this.langSub = this.languageService.lang$.subscribe(() => {
      this.title = this.languageService.getLabel('guides', 'title');
    });
  }

  /**
   * Lifecycle hook that runs when the component is destroyed.
   * Cleans up the language subscription to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }
}
