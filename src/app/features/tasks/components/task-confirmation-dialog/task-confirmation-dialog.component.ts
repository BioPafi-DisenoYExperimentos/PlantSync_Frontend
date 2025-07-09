// Import core Angular functionality and required Material Dialog modules
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,         // Token to inject the data passed to the dialog
  MatDialogActions,        // Material component for dialog actions section
  MatDialogContent,        // Material component for dialog content
  MatDialogRef,            // Reference to the dialog instance
  MatDialogTitle           // Material component for dialog title
} from '@angular/material/dialog';
import { MatButton } from "@angular/material/button"; // Material button module

/**
 * TaskConfirmationDialogComponent is a reusable confirmation dialog
 * used to confirm the deletion of a task.
 */
@Component({
  selector: 'app-task-confirmation-dialog',
  templateUrl: './task-confirmation-dialog.component.html',
  styleUrls: ['./task-confirmation-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ]
})
export class TaskConfirmationDialogComponent {

  /**
   * Initializes the confirmation dialog.
   * @param dialogRef - Reference to the open dialog instance
   * @param data - Data passed into the dialog (e.g., task to be confirmed)
   */
  constructor(
      public dialogRef: MatDialogRef<TaskConfirmationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Closes the dialog and returns `false` to indicate cancellation.
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * Closes the dialog and returns `true` to indicate confirmation.
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
