import React from "react";
import type { Task } from "../../types/Task";
import StatusBadge from "../embbeded/StatusBadge";
import { formatCreationDate } from "../../utils/formatCreationDate";
import { formatDeadline } from "../../utils/formatDeadline";

interface TaskCardProps {
  task: Task;
  index?: number;
  isNested?: boolean;
  userId?: string;
  onComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, isNested, onComplete, onDelete }) => {
   const dataFormatata = formatCreationDate(task.creationDate);
   const deadlineFormatata = formatDeadline(task.deadline);

   return (
    <div className="flex justify-between items-center px-6 py-5 mb-4 transition-all duration-300 rounded-xl shadow-sm bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:shadow-md hover:-translate-y-0.5">

        <div className="flex flex-col flex-1 pr-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 transition-colors">
                {index ? `${index}. ` : ""}{task.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3 transition-colors">
                Creat la: {dataFormatata}
            </p>
            
            <div className="inline-block bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-md px-3 py-1.5 w-max shadow-sm transition-colors">
                <p className="text-sm font-black text-red-600 dark:text-red-400 tracking-wide uppercase flex items-center gap-2">
                    Deadline: {deadlineFormatata}
                </p>
            </div>
        </div>

        <div className="w-36 flex justify-center px-2">
            <StatusBadge status={task.status} />
        </div>

        <div className="flex items-center gap-3 ml-4 border-l border-gray-200 dark:border-slate-600 pl-6 transition-colors">
            <button 
                onClick={() => onComplete && onComplete(task.id)}
                className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white text-sm font-bold rounded-lg transition-colors duration-200 shadow-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                title="Marchează ca Finalizat"
            >
                ✓ Complete
            </button>

            <button 
                onClick={() => onDelete && onDelete(task.id)}
                className="px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white text-sm font-bold rounded-lg transition-colors duration-200 shadow-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                title="Șterge Task"
            >
                ✗ Delete
            </button>
        </div>

    </div>
   );
};  

export default TaskCard;