import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Plant } from '../../model/plant';

/**
 * PlantCardComponent displays a visual card representation of a single plant.
 * It is used within lists or dashboards to provide a quick overview of the plant.
 */
@Component({
    selector: 'app-plant-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './plant-card.component.html',
    styleUrls: ['./plant-card.component.css']
})
export class PlantCardComponent {
    /**
     * The plant object to be displayed in the card.
     * Passed from the parent component as input.
     */
    @Input() plant!: Plant;
}
