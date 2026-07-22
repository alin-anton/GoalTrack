import {useEffect, useState, useCallback} from "react";
import type {Task} from "../types/Task";
import {TaskService} from "../services/TaskService";

export const useTasks = (userId: string | null) => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        try{
            setIsLoading(true);
            setError(null);

            const data = await TaskService.getByUserId(userId);
            setTasks(data);
        }
        catch (err) {
            console.error('Error fetching tasks:', err);
            setError('Failed to fetch tasks');
        }
        finally {
            setIsLoading(false);
        }



    }, [userId]);
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return { tasks, isLoading, error, refetch: fetchTasks };
};