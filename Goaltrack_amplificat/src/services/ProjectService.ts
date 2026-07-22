import api from "./api";
import type { Project } from "../types/Project";

export const ProjectService = {

    getById: async (id: string): Promise<Project> => {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },

getByUserId: async (userId: string): Promise<Project[]> => {
        const response = await api.get(`/projects/user/${userId}`);
        return response.data;
    },

    createProject: async (title: string, description: string,
        deadline:string,userId:string): Promise<Project> => {

            const response = await api.post<Project>('/projects', null ,{
                params: {
                    title: title,
                    description: description,
                    deadline: deadline,
                    userId: userId
                }
            });

            return response.data;
        },

        deleteProject: async (id: string): Promise<void> => {
            await api.delete(`/projects/${id}`);
        },

        updateProject: async (id: string, title: string, description: string, deadline: string): Promise<Project> => {
            const response = await api.put<Project>(`/projects/${id}`, null, {
                params: {
                    title: title,
                    description: description,
                    deadline: deadline
                }
            });

            return response.data;
        }

}