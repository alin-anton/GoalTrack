

export interface Task{
    id: string;
    title: string;
    status: string;
    creationDate: string;
    deadline: string;
    projectId?: string; // Optional, pentru a lega task-ul de un proiect
    userId: string;
}