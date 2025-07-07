import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantFormComponent } from '../../components/plant-form/plant-form.component';

@Component({
    selector: 'app-plant-form-page',
    standalone: true,
    imports: [CommonModule, PlantFormComponent],
    templateUrl: './plant-form.page.html'
})
export class PlantFormPage {}
