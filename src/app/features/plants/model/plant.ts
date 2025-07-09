/**
 * Represents a plant registered by the user.
 * Includes basic identification, care information, and ownership metadata.
 */
export class Plant {
    /** Unique identifier of the plant */
    id: number;

    /** Name given to the plant by the user */
    name: string;

    /** Species or type of the plant */
    species: string;

    /** Date the plant was acquired by the user (ISO format: YYYY-MM-DD) */
    acquisitionDate: string;

    /** Humidity level preference for the plant (e.g., 'LOW', 'MEDIUM', 'HIGH') */
    humidity: string;

    /** Date of the next scheduled watering (ISO format) */
    nextWateringDate: string;

    /** URL to an image of the plant */
    imageUrl: string;

    /** Whether notifications for this plant are enabled */
    notificationsEnabled: boolean;

    /** ID of the profile (user) that owns this plant */
    profileId: number;

    /**
     * Creates a new Plant instance with default values.
     */
    constructor() {
        this.id = 0;
        this.name = "";
        this.species = "";
        this.acquisitionDate = "";
        this.humidity = "";
        this.nextWateringDate = "";
        this.imageUrl = "";
        this.notificationsEnabled = false;
        this.profileId = 0;
    }
}
