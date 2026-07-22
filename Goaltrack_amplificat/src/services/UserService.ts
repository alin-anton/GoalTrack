import api from './api';
import type { Task } from '../types/Task';

export const UserService = {
    
    getById: async (userId: string): Promise<Task[]> => {
        const response = await api.get<Task[]>(`/users/${userId}/tasks`);
        return response.data;
    },

    getByEmail: async (email: string): Promise<Task[]> => {
        const response = await api.get<Task[]>(`/users/email/${email}/tasks`);
        return response.data;
    },

    getStats: async (userId: string): Promise<any> => {
        const response = await api.get<any>(`/users/${userId}/stats`);
        return response.data;
    },

    addUser: async (username: string,email: string, password: string): Promise<void> => {
        const response = await api.post<void>('/users', null,
            {params: {username, email, password}}
        );
        return response.data;
    },

    deleteUser: async (userId: string): Promise<void> => {
        await api.delete(`/users/${userId}`);
    },

    updatePassword: async (userId: string, newPassword: string): Promise<void> => {
        const response = await api.put(`/users/${userId}/password`, null,
            {params: {newPassword}}
        );
        return response.data;
    }
}