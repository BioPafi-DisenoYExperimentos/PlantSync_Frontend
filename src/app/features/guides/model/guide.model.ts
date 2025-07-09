/**
 * Represents a care guide or instructional resource related to plants.
 * Guides can be categorized by topic and type, and are typically visual.
 */
export class Guide {
    /** Unique identifier of the guide */
    id: number;

    /** Title of the guide */
    title: string;

    /** Author or creator's name */
    name: string;

    /** Detailed description of the guide content */
    description: string;

    /** Topic covered in the guide (e.g., watering, fertilizing) */
    topic: string;

    /** Type of guide (e.g., tutorial, tip, infographic) */
    type: string;

    /** URL pointing to the guide’s cover or preview image */
    imageUrl: string;

    /**
     * Creates a new Guide instance with default empty values.
     */
    constructor() {
        this.id = 0;
        this.title = "";
        this.name = "";
        this.description = "";
        this.topic = "";
        this.type = "";
        this.imageUrl = "";
    }
}
