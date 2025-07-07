import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../model/plant';
import { Profile } from '../../../profile/model/profile.entity';
import { PlantCardListComponent } from '../../components/plant-card-list/plant-card-list.component';
import { LanguageService } from '../../../../shared/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mis-plantas',
  standalone: true,
  templateUrl: './mis-plantas.component.html',
  styleUrls: ['./mis-plantas.component.css'],
  imports: [CommonModule, RouterModule, PlantCardListComponent]
})
export class MisPlantasComponent implements OnInit, OnDestroy {
  plants: Plant[] = [];
  title: string = '';
  addButtonText: string = '';
  private langSub?: Subscription;

  constructor(
      private plantService: PlantService,
      private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    const currentProfileJson = localStorage.getItem('currentProfile');
    if (!currentProfileJson) return;

    const currentProfile: Profile = JSON.parse(currentProfileJson);
    this.plantService.getPlantsByProfileId(currentProfile.id).subscribe((plants) => {
      this.plants = plants;
    });

    // Inicializa texto según el idioma actual
    this.title = this.languageService.getLabel('plants', 'title');
    this.addButtonText = this.languageService.getLabel('plants', 'addPlant');


    // Reactualiza en cambios de idioma
    this.langSub = this.languageService.lang$.subscribe(() => {
      this.title = this.languageService.getLabel('plants', 'title');
      this.addButtonText = this.languageService.getLabel('plants', 'addPlant');

    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }
}
