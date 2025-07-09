/**
 * Represents the current weather status for a specific location.
 * Includes temperature and humidity data.
 */
export class WeatherStatus {
    /**
     * Creates a new WeatherStatus instance.
     * @param id - Unique identifier for the weather status record
     * @param location - Name of the location (e.g., city or region)
     * @param temperature - Current temperature in Celsius
     * @param humidity - Current humidity percentage
     */
    constructor(
        public id: number,
        public location: string,
        public temperature: number,
        public humidity: number
    ) {}
}
