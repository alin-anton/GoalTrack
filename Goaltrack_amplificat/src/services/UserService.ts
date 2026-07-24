import api from './api';
import type { User } from '../types/User';

export const UserService = {
    
    getById: async (idUser: string): Promise<User> => {
        const response = await api.get<User>(`/users/${idUser}`);
        return response.data;
    },

    getByEmail: async (email: string): Promise<User> => {
        const response = await api.get<User>(`/users/email/${email}`);
        return response.data;
    },

    getStats: async (userId: string): Promise<any> => {
        const response = await api.get<any>(`/users/${userId}/stats`);
        return response.data;
    },

    // CORECTAT: Datele sunt trimise acum în Body sub formă de JSON, invizibile în URL
    addUser: async (username: string, email: string, password: string): Promise<void> => {
        const response = await api.post<void>('/users', { 
            username, 
            email, 
            password 
        });
        return response.data;
    },

    deleteUser: async (userId: string): Promise<void> => {
        await api.delete(`/users/${userId}`);
    },

    // CORECTAT: Parola este trimisă în Body
    updatePassword: async (userId: string, newPassword: string): Promise<void> => {
        const response = await api.put(`/users/${userId}/password`, { 
            newPassword 
        });
        return response.data;
    }
}