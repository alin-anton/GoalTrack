import {useEffect, useState, useCallback} from "react";
import type {User} from "../types/User";
import {UserService} from "../services/UserService";


export const useUser = (userId: string | null) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            
            const data = await UserService.getById(userId);
            setUser(data);
        }
        catch (err) {
            console.error('Error fetching user:', err);
            setError('Failed to fetch user');
        }
        finally {
            setIsLoading(false);
        }

    }, [userId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, isLoading, error, refetch: fetchUser };
};