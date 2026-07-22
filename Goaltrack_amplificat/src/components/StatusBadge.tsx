import React from "react";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
    const statusStyles: { [key: string]: string } = {
        "COMPLETED": "bg-green-500 text-white",
        "IN PROGRESS": "bg-yellow-500 text-white",
        "DUE": "bg-red-500 text-white"
    }


    const currentStatusStyle = statusStyles[status] || "bg-gray-500 text-white";



    return (
        <span className={`px-2.5 py-1 rounded ${currentStatusStyle} ${className}`}>
            {status}
        </span>
    );

}

export default StatusBadge;