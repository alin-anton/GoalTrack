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

    createTask: async (title:string, deadline: string,
         userId: string, projectId?: string): Promise<Task> => {

            const requestBody: any = {
                title,
                deadline,
                userId
            };

            if(projectId) {
                requestBody.projectId = projectId;
            }

            const response = await api.post<Task>('/tasks', null, 
                {params: requestBody}
            );

            return response.data;
    },

    finishTask: async (taskId: string): Promise<Task> => {
        const response = await api.put<Task>(`/tasks/${taskId}/finish`);
        return response.data;
    },

    deleteTask: async (taskId: string): Promise<void> => {
        await api.delete(`/tasks/${taskId}`);
    }

}