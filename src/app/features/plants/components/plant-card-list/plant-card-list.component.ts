import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plant } from '../../model/plant';
import { PlantCardComponent } from '../plant-card/plant-card.component';

@Component({
    selector: 'app-plant-card-list',
    standalone: true,
    imports: [CommonModule, PlantCardComponent],
    templateUrl: './plant-card-list.component.html',
    styleUrls: ['./plant-card-list.component.css']
})
export class PlantCardListComponent {
    @Input() plants: Plant[] = [];
}
