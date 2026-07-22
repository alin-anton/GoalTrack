import {useEffect, useState, useCallback} from "react";
import type {Project} from "../types/Project";
import {ProjectService} from "../services/ProjectService";

export const useProject = (userId: string | null) => {
    const [project, setProject] = useState<Project[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const fetchProject = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const data = await ProjectService.getByUserId(userId);
            setProject(data);
        }
        catch (err) {
            console.error('Error fetching project:', err);
            setError('Failed to fetch project');
        }
        finally {
            setIsLoading(false);
        }

    }, [userId]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    return { project, isLoading, error, refetch: fetchProject };
};