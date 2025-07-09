import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Plant } from "../../../plants/model/plant";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { PlantService } from "../../../plants/services/plant.service";
import { TaskService } from "../../services/task.service";
import { Component, OnInit } from "@angular/core";
import { Task } from "../../model/task.entity";

/**
 * AddTaskDialogComponent provides a modal form for creating a new plant task.
 * It allows the user to select a plant, specify an action, and choose a date.
 */
@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent implements OnInit {
  /** Form group containing fields for creating a new task */
  form!: FormGroup;

  /** List of plants available for selection */
  plants: Plant[] = [];

  /** ID of the current user's profile */
  profileId!: number;

  /**
   * Injects required services for form building, plant and task operations, and dialog control.
   * @param fb - FormBuilder for initializing the reactive form
   * @param plantService - Service to fetch plants by user profile
   * @param taskService - Service to create tasks
   * @param dialogRef - Reference to the current dialog instance
   */
  constructor(
      private fb: FormBuilder,
      private plantService: PlantService,
      private taskService: TaskService,
      private dialogRef: MatDialogRef<AddTaskDialogComponent>
  ) {}

  /**
   * Lifecycle hook executed when the dialog component is initialized.
   * Initializes the form and loads the current user's plants.
   */
  ngOnInit(): void {
    const profileJson = localStorage.getItem('currentProfile');
    if (!profileJson) return;

    const currentProfile = JSON.parse(profileJson);
    this.profileId = currentProfile.id;

    this.form = this.fb.group({
      plantId: ['', Validators.required],
      action: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.plantService.getPlantsByProfileId(this.profileId).subscribe(plants => {
      this.plants = plants;
    });
  }

  /**
   * Submits the form, formats the date, and sends the task to the backend.
   * Closes the dialog with a success response on completion.
   */
  onSubmit(): void {
    if (this.form.invalid) return;

    const rawDate: Date = this.form.value.date;
    const formattedDate = rawDate.toISOString().split('T')[0];

    const task: Task = {
      id: 0,
      completed: false,
      profileId: this.profileId,
      ...this.form.value,
      date: formattedDate,
    };

    this.taskService.create(task).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  /**
   * Cancels the dialog without creating a task.
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
