import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../model/plant';
import { Profile } from '../../../profile/model/profile.entity';
import { PlantCardListComponent } from '../../components/plant-card-list/plant-card-list.component';
import { LanguageService } from '../../../../shared/services/language.service';
import { Subscription } from 'rxjs';

/**
 * MisPlantasComponent displays the list of plants associated with the current user profile.
 * It supports multilingual labels and listens for language changes in real time.
 */
@Component({
  selector: 'app-mis-plantas',
  standalone: true,
  templateUrl: './mis-plantas.component.html',
  styleUrls: ['./mis-plantas.component.css'],
  imports: [CommonModule, RouterModule, PlantCardListComponent]
})
export class MisPlantasComponent implements OnInit, OnDestroy {
  /** Array of plants to be displayed */
  plants: Plant[] = [];

  /** Section title, dynamically set based on language */
  title: string = '';

  /** Label for the "Add Plant" button */
  addButtonText: string = '';

  /** Subscription to language changes */
  private langSub?: Subscription;

  /**
   * Injects services for retrieving plant data and handling language translations.
   * @param plantService - Service to fetch plants by user profile
   * @param languageService - Service for managing UI translations
   */
  constructor(
      private plantService: PlantService,
      private languageService: LanguageService
  ) {}

  /**
   * Lifecycle hook executed when the component is initialized.
   * Loads plants for the current profile and sets translated UI labels.
   */
  ngOnInit(): void {
    const currentProfileJson = localStorage.getItem('currentProfile');
    if (!currentProfileJson) return;

    const currentProfile: Profile = JSON.parse(currentProfileJson);

    this.plantService.getPlantsByProfileId(currentProfile.id).subscribe((plants) => {
      this.plants = plants;
    });

    // Load initial labels based on selected language
    this.title = this.languageService.getLabel('plants', 'title');
    this.addButtonText = this.languageService.getLabel('plants', 'addPlant');

    // Listen for language changes and update labels reactively
    this.langSub = this.languageService.lang$.subscribe(() => {
      this.title = this.languageService.getLabel('plants', 'title');
      this.addButtonText = this.languageService.getLabel('plants', 'addPlant');
    });
  }

  /**
   * Lifecycle hook executed just before the component is destroyed.
   * Unsubscribes from the language service to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }
}
