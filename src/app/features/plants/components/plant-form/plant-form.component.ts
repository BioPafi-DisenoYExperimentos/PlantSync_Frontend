import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../model/plant';
import { Profile } from '../../../profile/model/profile.entity';

/**
 * PlantFormComponent is responsible for creating and editing plant records.
 * It uses Reactive Forms and determines the mode (create or edit) based on the route parameter.
 */
@Component({
    selector: 'app-plant-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './plant-form.component.html',
    styleUrls: ['./plant-form.component.css']
})
export class PlantFormComponent implements OnInit {
    /** Reactive form group for plant data */
    plantForm!: FormGroup;

    /** Flag to determine whether the form is in edit mode */
    isEditMode = false;

    /** Stores the plant ID when editing */
    plantId!: number;

    /**
     * Injects services required for form building, routing, and data operations.
     * @param fb - FormBuilder to initialize the reactive form
     * @param route - ActivatedRoute to access route parameters
     * @param router - Router to navigate after submission
     * @param plantService - Service to perform CRUD operations on plants
     */
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private plantService: PlantService
    ) {}

    /**
     * Initializes the form with controls and sets up edit mode if an ID is present in the route.
     */
    ngOnInit(): void {
        this.plantForm = this.fb.group({
            name: ['', Validators.required],
            species: ['', Validators.required],
            acquisitionDate: ['', Validators.required],
            humidity: ['MEDIA'],
            nextWateringDate: [''],
            imageUrl: [''],
            notificationsEnabled: [false]
        });

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.plantId = +id;
            this.plantService.getPlantById(this.plantId).subscribe(plant => {
                this.plantForm.patchValue(plant);
            });
        }
    }

    /**
     * Handles file input for the plant image and converts it to a base64 string.
     * @param event - File input change event
     */
    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64Image = reader.result as string;
            this.plantForm.patchValue({ imageUrl: base64Image });
        };

        reader.readAsDataURL(file);
    }

    /**
     * Handles form submission for both create and edit modes.
     * Adds or updates a plant record and navigates back to the plant list.
     */
    onSubmit(): void {
        const formData = this.plantForm.value;
        const currentProfileJson = localStorage.getItem('currentProfile');
        if (!currentProfileJson) return;
        const currentProfile: Profile = JSON.parse(currentProfileJson);

        if (this.isEditMode) {
            const updatedPlant: Plant = {
                ...formData,
                profileId: currentProfile.id,
                id: this.plantId,
                nextWateringDate: formData.nextWateringDate ?? this.generateNextWateringDate()
            };
            this.plantService.updatePlant(this.plantId, updatedPlant).subscribe(() => {
                this.router.navigate(['/plants']);
            });
        } else {
            const newPlant: Plant = {
                ...formData,
                profileId: currentProfile.id,
                nextWateringDate: this.generateNextWateringDate()
            };
            delete (newPlant as any).id;
            this.plantService.addPlant(newPlant).subscribe(() => {
                this.router.navigate(['/plants']);
            });
        }
    }

    /**
     * Generates a default next watering date, 5 days from today.
     * @returns A string with the date in YYYY-MM-DD format
     */
    generateNextWateringDate(): string {
        const today = new Date();
        today.setDate(today.getDate() + 5);
        return today.toISOString().split('T')[0];
    }
}
