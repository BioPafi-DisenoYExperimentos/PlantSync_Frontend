export class Profile {
    id: number;
    userId: number;
    personName: string;
    subscriptionPlan: string;
    paymentStatus: 'PENDING' | 'PAID';

    constructor(data: Partial<Profile> = {}) {
        this.id = data.id ?? 0;
        this.userId = data.userId ?? 0;
        this.personName = data.personName ?? '';
        this.subscriptionPlan = data.subscriptionPlan ?? 'basic';
        this.paymentStatus = data.paymentStatus ?? 'PENDING';
    }
}