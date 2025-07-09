import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../model/plant';
import { WeatherCardComponent } from "../../../weather/components/weather-card/weather-card.component";

/**
 * PlantDetailComponent displays detailed information about a specific plant.
 * It also allows deletion of the plant and includes weather-related insights via WeatherCardComponent.
 */
@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, WeatherCardComponent],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {
  /** Plant data to be shown in the detail view */
  plant!: Plant;

  /** ID of the plant to be displayed, extracted from the route */
  plantId!: number;

  /**
   * Injects required services for route handling, navigation, and plant data operations.
   * @param route - ActivatedRoute to extract route parameters
   * @param router - Router to navigate after deletion
   * @param plantService - Service to fetch and delete plant data
   */
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private plantService: PlantService
  ) {}

  /**
   * Lifecycle hook triggered when the component initializes.
   * Loads plant details using the ID from the route.
   */
  ngOnInit(): void {
    this.plantId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPlant();
  }

  /**
   * Fetches plant data from the service and assigns it to the local `plant` property.
   */
  loadPlant(): void {
    this.plantService.getPlantById(this.plantId).subscribe(data => this.plant = data);
  }

  /**
   * Deletes the current plant after user confirmation and navigates back to the plant list.
   */
  onDelete(): void {
    if (confirm('Are you sure you want to delete this plant?')) {
      this.plantService.deletePlant(this.plantId).subscribe(() => {
        this.router.navigate(['/plants']);
      });
    }
  }
}
