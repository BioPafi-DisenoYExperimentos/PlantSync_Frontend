import { Injectable } from '@angular/core';
import { Guide } from '../model/guide.model';
import { BaseService} from "../../../shared/services/base.service";
import { environment} from "../../../../environments/environment.development";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GuidesService extends BaseService<Guide> {


    override resourceEndpoint: string = environment.ENDPOINT_PATH_GUIDES;

    constructor() {
        super();
    }

    getGuides(): Observable<Guide[]> {
        return this.getAll();
    }

    getGuideById(id: number): Observable<Guide> {
        return this.getById(id);
    }
}
