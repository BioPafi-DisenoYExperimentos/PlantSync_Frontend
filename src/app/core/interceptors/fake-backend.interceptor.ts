import { HttpInterceptorFn, HttpResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize, mergeMap } from 'rxjs/operators';
import { MOCK_DB, saveMockDb } from '../mocks/mock-db';

export const fakeBackendInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const { url, method, body } = req;

    if (!url.includes('/api/v1/')) {
        return next(req);
    }

    const handleRoute = (): Observable<HttpEvent<any>> => {

        let payload: any = {};
        if (body) {
            if (typeof body === 'string') {
                try { payload = JSON.parse(body); } catch (e) { }
            } else {
                payload = { ...body };
            }
        }

        // --- AUTH ---
        if (url.includes('/api/v1/authentication/sign-in') && method === 'POST') {
            const loginEmail = payload.email || payload.username;
            const user = MOCK_DB.users.find((u: any) => u.email === loginEmail && u.password === payload.password);
            if (user) return ok({ token: user.token, id: user.id, username: user.email });
            return error('Credenciales incorrectas');
        }

        // --- USERS & PROFILES ---
        if (url.includes('/api/v1/users/') && method === 'GET') return ok(MOCK_DB.users[0]);
        if (url.includes('/api/v1/profiles') && method === 'GET') return ok(MOCK_DB.profiles);

        // --- WEATHER ---
        if (url.includes('/api/v1/weather')) {
            return ok({ temp: 22.5, temperature: 22.5, humidity: 65, condition: 'Despejado', description: 'Cielo claro y soleado', city: 'Lima', main: { temp: 22.5, humidity: 65 }, weather: [{ main: 'Clear', description: 'cielo claro' }] });
        }

        // ==========================================
        // --- PLANTS ---
        // ==========================================
        if (url.includes('/api/v1/plants')) {
            const path = url.split('?')[0]; // Limpiamos query params
            const urlParts = path.split('/');
            const lastSegment = urlParts[urlParts.length - 1];

            if (method === 'GET') {
                if (url.includes('/by-profile/')) {
                    return ok(MOCK_DB.plants.filter((p: any) => p.profileId.toString() === lastSegment));
                }
                return ok(MOCK_DB.plants);
            }

            if (method === 'POST' || method === 'PUT') {
                const targetId = !isNaN(parseInt(lastSegment)) ? parseInt(lastSegment) : (payload.id ? parseInt(payload.id) : null);
                const resolvedImage = payload.imageUrl || payload.image || 'https://images.unsplash.com/photo-1416879598555-2572fa82798e?auto=format&fit=crop&w=400&q=80';

                let plantIndex = MOCK_DB.plants.findIndex((p: any) => p.id === targetId);

                if (plantIndex !== -1) {
                    MOCK_DB.plants[plantIndex] = { ...MOCK_DB.plants[plantIndex], ...payload, imageUrl: resolvedImage, image: resolvedImage };
                    saveMockDb();
                    return ok(MOCK_DB.plants[plantIndex]);
                } else {
                    const nextId = MOCK_DB.plants.length > 0 ? Math.max(...MOCK_DB.plants.map((p: any) => Number(p.id))) + 1 : 1;
                    const newPlant = { ...payload, id: nextId, profileId: payload.profileId ? parseInt(payload.profileId) : 1, imageUrl: resolvedImage, image: resolvedImage };
                    MOCK_DB.plants.push(newPlant);
                    saveMockDb();
                    return ok(newPlant);
                }
            }

            // BORRAR PLANTA (Lógica reforzada)
            if (method === 'DELETE') {
                const idToDelete = lastSegment; // Se usa como String

                // Filtramos forzando la comparación como texto
                MOCK_DB.plants = MOCK_DB.plants.filter((p: any) => p.id.toString() !== idToDelete);
                // Si borras la planta, también borramos sus tareas
                MOCK_DB.tasks = MOCK_DB.tasks.filter((t: any) => t.plantId.toString() !== idToDelete);

                saveMockDb();
                return ok({ message: 'Planta eliminada exitosamente' });
            }
        }

        // ==========================================
        // --- TASKS ---
        // ==========================================
        if (url.includes('/api/v1/tasks')) {
            const path = url.split('?')[0];
            const urlParts = path.split('/');
            const lastSegment = urlParts[urlParts.length - 1];

            if (method === 'GET') {
                if (url.includes('/by-profile/')) {
                    return ok(MOCK_DB.tasks.filter((t: any) => t.profileId.toString() === lastSegment));
                }
                return ok(MOCK_DB.tasks);
            }

            if (method === 'POST' || method === 'PUT') {
                const targetId = !isNaN(parseInt(lastSegment)) ? parseInt(lastSegment) : (payload.id ? parseInt(payload.id) : null);
                const baseDateStr = payload.date || payload.dueDate || payload.scheduledDate || new Date().toISOString().split('T')[0];
                const plainDateStr = baseDateStr.includes('T') ? baseDateStr.split('T')[0] : baseDateStr;
                const titleStr = payload.action || payload.title || 'Nueva Tarea';

                let taskIndex = MOCK_DB.tasks.findIndex((t: any) => t.id === targetId);

                if (taskIndex !== -1) {
                    MOCK_DB.tasks[taskIndex] = { ...MOCK_DB.tasks[taskIndex], ...payload, title: titleStr, action: titleStr, dueDate: baseDateStr, date: plainDateStr, scheduledDate: plainDateStr };
                    saveMockDb();
                    return ok(MOCK_DB.tasks[taskIndex]);
                } else {
                    const nextId = MOCK_DB.tasks.length > 0 ? Math.max(...MOCK_DB.tasks.map((t: any) => Number(t.id))) + 1 : 1;
                    const newTask = {
                        ...payload, id: nextId, profileId: payload.profileId ? parseInt(payload.profileId) : 1, plantId: payload.plantId ? parseInt(payload.plantId) : 1,
                        title: titleStr, action: titleStr, status: payload.completed ? 'COMPLETED' : 'PENDING', completed: payload.completed || false,
                        dueDate: baseDateStr, date: plainDateStr, scheduledDate: plainDateStr
                    };
                    MOCK_DB.tasks.push(newTask);
                    saveMockDb();
                    return ok(newTask);
                }
            }

            // BORRAR TAREA
            if (method === 'DELETE') {
                const idToDelete = lastSegment;
                MOCK_DB.tasks = MOCK_DB.tasks.filter((t: any) => t.id.toString() !== idToDelete);
                saveMockDb();
                return ok({ message: 'Tarea eliminada exitosamente' });
            }
        }

        // --- GUIDES ---
        if (url.includes('/api/v1/guides') && method === 'GET') return ok(MOCK_DB.guides);

        if (method === 'GET') return ok([]);
        return ok({ message: 'Operación simulada' });
    };

    function ok(body?: any) {
        return of(new HttpResponse({ status: 200, body })).pipe(delay(200));
    }

    function error(message: string, status: number = 400) {
        return throwError(() => ({ error: { message }, status })).pipe(materialize(), delay(200), dematerialize());
    }

    return of(null).pipe(mergeMap(handleRoute));
};