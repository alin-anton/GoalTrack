import api from './api';
import type { User } from '../types/User';

export const UserService = {
    
    getById: async (userId: string): Promise<User> => {
        const response = await api.get<User>(`/api/users/${userId}`);
        return response.data;
    },

    getByEmail: async (email: string): Promise<User> => {
        const response = await api.get<User>(`/api/users/email/${email}`);
        return response.data;
    },

    getStats: async (userId: string): Promise<any> => {
        const response = await api.get<any>(`/api/users/${userId}/stats`);
        return response.data;
    },

    // CORECTAT: Datele sunt trimise acum în Body sub formă de JSON, invizibile în URL
    addUser: async (username: string, email: string, password: string): Promise<void> => {
        const response = await api.post<void>('/api/users', { 
            username, 
            email, 
            password 
        });
        return response.data;
    },

    deleteUser: async (userId: string): Promise<void> => {
        await api.delete(`/api/users/${userId}`);
    },

    // CORECTAT: Parola este trimisă în Body
    updatePassword: async (userId: string, newPassword: string): Promise<void> => {
        const response = await api.put(`/api/users/${userId}/password`, { 
            newPassword 
        });
        return response.data;
    }
}