import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../model/user.entity";
import {BaseService} from "../../../shared/services/base.service";

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService<User>{

    private apiUrl = `${this.serverBaseUrl}/authentication`;



    signUp(user: {
        name: string;
        email: string;
        password: string;
        subscriptionPlan: string;
    }): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/sign-up`, user);
    }

    signIn(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/sign-in`, credentials);
    }


}
