

export interface Task{
    id: string;
    title: string;
    status: string;
    creationDate: string;
    deadline: string;
    projectID?: string; // Optional, pentru a lega task-ul de un proiect
    userId: string;
}