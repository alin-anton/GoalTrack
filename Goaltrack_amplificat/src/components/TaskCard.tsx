import React from "react";
import type { Task } from "../types/Task";
import StatusBadge from "./StatusBadge";
import {formatCreationDate} from "../utils/formatCreationDate";
import {formatDeadline} from "../utils/formatDeadline";


interface TaskCardProps {
  task: Task;
  index?: number;
  isNested?: boolean;
  onToggle?: (id: string) => void;
}




const TaskCard: React.FC<TaskCardProps> = ({ task, index, isNested, onToggle }) => {
   const dataFormatata = formatCreationDate(task.creationDate);
   const deadlineFormatata = formatDeadline(task.deadline);

   return (
    <div className={`flex justify-between items-center px-4 py-4 mb-4
    transition-colors duration-300 rounded-lg shadow-md bg-white hover:bg-gray-100
    ${isNested ? 'ml-8 border-l-4 border-rose-400 dark:border-rose-500' : ''}`}>

        <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
            <p className="text-sm text-gray-500">Creat la: {dataFormatata}</p>
            <p className="text-sm text-gray-500">Deadline: {deadlineFormatata}</p>
        </div>

        <StatusBadge status={task.status} />

        <button 
        onClick={() => onToggle && onToggle(task.id)}
        className="
          w-[42px] h-[42px] rounded-full 
          bg-rose-300 hover:bg-rose-400 
          dark:bg-rose-500 dark:hover:bg-rose-400 
          transition-colors duration-300 focus:outline-none 
          focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-300 
          focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800
        "
        aria-label="Marchează task-ul"
      ></button>


    </div>
   );

};  

export default TaskCard;
