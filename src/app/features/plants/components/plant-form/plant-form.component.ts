import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../model/plant';
import { Profile } from '../../../profile/model/profile.entity';

@Component({
    selector: 'app-plant-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './plant-form.component.html',
    styleUrls: ['./plant-form.component.css']
})
export class PlantFormComponent implements OnInit {
    plantForm!: FormGroup;
    isEditMode = false;
    plantId!: number;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private plantService: PlantService
    ) {}

    ngOnInit(): void {
        this.plantForm = this.fb.group({
            name: ['', Validators.required],
            species: ['', Validators.required],
            acquisitionDate: ['', Validators.required],
            humidity: ['Normal'],
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

    generateNextWateringDate(): string {
        const today = new Date();
        today.setDate(today.getDate() + 5);
        return today.toISOString().split('T')[0];
    }
}
