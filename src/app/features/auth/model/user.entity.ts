/**
 * Represents a user account in the system.
 * Typically used for authentication and identity purposes.
 */
export class User {
    /** Unique identifier for the user */
    id: number;

    /** Email address used for login */
    email: string;

    /**
     * Password of the user.
     * This is optional because it may not always be present when fetching user data.
     */
    password?: string;

    /**
     * Constructs a new User instance with default values or provided data.
     * @param data - Partial object containing user properties to initialize
     */
    constructor(data: Partial<User> = {}) {
        this.id = data.id ?? 0;
        this.email = data.email ?? '';
        this.password = data.password ?? '';
    }
}
