/**
 * Represents a scheduled task or action related to plant care.
 * Tasks are linked to both a plant and a user profile.
 */
export class Task {
    /** Unique identifier for the task */
    id: number;

    /** Date of the task (ISO string format, e.g. '2025-07-09') */
    date: string;

    /** Description of the action to perform (e.g., 'Watering') */
    action: string;

    /** Indicates whether the task has been completed */
    completed: boolean;

    /** ID of the plant associated with this task */
    plantId: number;

    /** ID of the profile (user) who owns this task */
    profileId: number;

    /**
     * Creates a new Task instance with default values.
     */
    constructor() {
        this.id = 0;
        this.date = '';
        this.action = '';
        this.completed = false;
        this.plantId = 0;
        this.profileId = 0;
    }
}

/**
 * View model that extends the base Task entity with additional UI data.
 * Useful for displaying task-related plant details in the frontend.
 */
export interface TaskViewModel extends Task {
    /** Name of the plant associated with the task */
    plantName: string;

    /** Image URL of the plant */
    imageUrl: string;
}
