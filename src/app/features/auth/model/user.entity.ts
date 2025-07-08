export class User {
    id: number;

    email: string;
    password?: string;


    constructor(data: Partial<User> = {}) {
        this.id = data.id ?? 0;
        this.email = data.email ?? '';
        this.password = data.password ?? '';
    }
}
