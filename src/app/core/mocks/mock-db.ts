// src/app/core/mocks/mock-db.ts

const defaultDb = {
    users: [
        { id: 1, email: 'correo@ejemplo.com', password: 'password123', token: 'fake-jwt-token-123', username: 'UsuarioBioDemeter' }
    ],
    profiles: [
        { id: 1, userId: 1, firstName: 'Usuario', lastName: 'BioDemeter', subscriptionPlan: 'premium' }
    ],
    plants: [
        { id: 1, profileId: 1, name: 'Monstera', species: 'Monstera Deliciosa', humidityLevel: 'MEDIUM', acquisitionDate: '2023-01-15',
            imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&w=400&q=80',
            image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&w=400&q=80' },
        { id: 2, profileId: 1, name: 'Cactus', species: 'Cactus spp.', humidityLevel: 'LOW', acquisitionDate: '2023-05-20',
            imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=400&q=80',
            image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=400&q=80' }
    ],
    tasks: [
        {
            id: 1, profileId: 1, plantId: 1,
            title: 'Regar Monstera', action: 'Regar Monstera', description: 'Aplicar 200ml de agua',
            status: 'PENDING', completed: false,
            dueDate: '2026-05-16', scheduledDate: '2026-05-16', date: '2026-05-16'
        },
        {
            id: 2, profileId: 1, plantId: 2,
            title: 'Revisar humedad', action: 'Revisar humedad', description: 'Verificar sustrato',
            status: 'COMPLETED', completed: true,
            dueDate: '2026-05-15', scheduledDate: '2026-05-15', date: '2026-05-15'
        }
    ],
    guides: [
        { id: 1, title: 'Cuidado de Monstera', species: 'Monstera Deliciosa', description: 'Guía esencial para Monstera.', content: 'Requiere luz indirecta...', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&w=400&q=80', imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&w=400&q=80', topic: 'Riego', type: 'Artículo' }
    ]
};

// Recuperación segura del LocalStorage
const savedDbStr = typeof window !== 'undefined' ? localStorage.getItem('biodemeter_mock_db') : null;
export const MOCK_DB = savedDbStr ? JSON.parse(savedDbStr) : defaultDb;

export function saveMockDb() {
    if (typeof window !== 'undefined') {
        localStorage.setItem('biodemeter_mock_db', JSON.stringify(MOCK_DB));
    }
}