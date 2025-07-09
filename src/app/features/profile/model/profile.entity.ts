/**
 * Represents a user profile, linked to a user account.
 * Contains personal details and subscription-related metadata.
 */
export class Profile {
    /** Unique identifier for the profile */
    id: number;

    /** ID of the user to whom this profile belongs */
    userId: number;

    /** Name of the person associated with the profile */
    personName: string;

    /** Chosen subscription plan (e.g., 'basic', 'premium', 'pro') */
    subscriptionPlan: string;

    /** Payment status for the subscription: either 'PENDING' or 'PAID' */
    paymentStatus: 'PENDING' | 'PAID';

    /**
     * Constructs a Profile instance with optional partial initialization.
     * Defaults are provided for each field to ensure robustness.
     *
     * @param data - Optional object to initialize the profile fields
     */
    constructor(data: Partial<Profile> = {}) {
        this.id = data.id ?? 0;
        this.userId = data.userId ?? 0;
        this.personName = data.personName ?? '';
        this.subscriptionPlan = data.subscriptionPlan ?? 'basic';
        this.paymentStatus = data.paymentStatus ?? 'PENDING';
    }
}
