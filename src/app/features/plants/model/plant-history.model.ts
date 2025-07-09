/**
 * Represents a historical record of a plant's activity or condition,
 * such as watering or humidity measurement.
 */
export class PlantHistory {
    /**
     * Creates a new instance of PlantHistory with all required fields.
     * @param id - Unique identifier for the history record
     * @param plantId - ID of the plant this history entry belongs to
     * @param type - Type of event (e.g., 'watering', 'check', etc.)
     * @param date - Date of the event (ISO string format)
     * @param time - Time of the event (HH:mm format)
     * @param humidity - Recorded humidity value at the time of the event
     */
    constructor(
        public id: number,
        public plantId: number,
        public type: string,
        public date: string,
        public time: string,
        public humidity: number
    ) {}

    /**
     * Returns the event date formatted for display in the 'es-PE' locale.
     * Example: "09 jul. 2025"
     */
    get formattedDate(): string {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(this.date).toLocaleDateString('es-PE', options);
    }

    /**
     * Combines the date and time into a single datetime string.
     * Example: "2025-07-09 14:30"
     */
    get datetime(): string {
        return `${this.date} ${this.time}`;
    }
}
