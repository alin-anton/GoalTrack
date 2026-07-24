import api from './api';
import type { Task } from '../types/Task';

export const TaskService = {

    getByUserId: async (userId: string): Promise<Task[]> => {
        const response = await api.get<Task[]>(`/tasks/user/${userId}`);
        return response.data;
    },

    getByProjectId: async (projectId: string): Promise<Task[]> => {
        const response = await api.get<Task[]>(`/tasks/project/${projectId}`);
        return response.data;
    },

    getById: async (taskId: string): Promise<Task> => {
        const response = await api.get<Task>(`/tasks/${taskId}`);
        return response.data;
    },

    createTask: async (title: string, deadline: string, userId: string, projectId?: string): Promise<Task> => {
        const params: any = {
            title: title,
            deadline: deadline,
            userID: userId // Corespunde exact cu @RequestParam String userID din TaskController
        };

        if (projectId) {
            params.projectID = projectId; // Corespunde cu @RequestParam String projectID
        }

        const response = await api.post<Task>('/tasks', null, { params });
        return response.data;
    },

    finishTask: async (taskId: string): Promise<Task> => {
        const response = await api.patch<Task>(`/tasks/${taskId}`);
        return response.data;
    },

    deleteTask: async (taskId: string): Promise<void> => {
        await api.delete(`/tasks/${taskId}`);
    }
};