/**
 * Represents a care tip associated with a specific humidity range.
 * Used to provide context-aware recommendations for plant care based on current humidity.
 */
export class WeatherTip {
    /**
     * Creates a new WeatherTip instance.
     * @param humidityRange - A tuple representing the minimum and maximum humidity values ([min, max])
     * @param tip - A textual recommendation or advice related to the specified humidity range
     */
    constructor(
        public humidityRange: [number, number],
        public tip: string
    ) {}
}
