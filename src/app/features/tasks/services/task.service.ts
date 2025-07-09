import { Injectable } from '@angular/core';
import { Task } from "../model/task.entity";
import { BaseService } from "../../../shared/services/base.service";
import { environment } from "../../../../environments/environment.development";

/**
 * TaskService provides access to CRUD operations for Task entities.
 * It extends the generic BaseService and uses a custom endpoint from environment configuration.
 */
@Injectable({
    providedIn: 'root'
})
export class TaskService extends BaseService<Task> {
    /** API endpoint path for task-related operations */
    override resourceEndpoint = environment.ENDPOINT_PATH_TASKS;

    /**
     * Initializes the service and calls the parent BaseService constructor.
     */
    constructor() {
        super();
    }
}
