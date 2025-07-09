import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plant } from '../../model/plant';
import { PlantCardComponent } from '../plant-card/plant-card.component';

/**
 * PlantCardListComponent displays a list of plant cards.
 * It serves as a container to render multiple PlantCardComponent instances.
 */
@Component({
    selector: 'app-plant-card-list',
    standalone: true,
    imports: [CommonModule, PlantCardComponent],
    templateUrl: './plant-card-list.component.html',
    styleUrls: ['./plant-card-list.component.css']
})
export class PlantCardListComponent {
    /**
     * Array of Plant objects to be displayed as individual cards.
     * Passed from a parent component as input.
     */
    @Input() plants: Plant[] = [];
}
