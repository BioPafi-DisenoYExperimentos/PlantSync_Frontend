import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Plant } from '../../model/plant';

@Component({
    selector: 'app-plant-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './plant-card.component.html',
    styleUrls: ['./plant-card.component.css']
})
export class PlantCardComponent {
    @Input() plant!: Plant;
}
