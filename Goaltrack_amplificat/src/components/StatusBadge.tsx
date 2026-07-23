import React from "react";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
    // Am rafinat puțin culorile pentru a fi mai moderne și am adăugat PENDING
    const statusStyles: { [key: string]: string } = {
        "COMPLETED": "bg-green-500 text-white shadow-sm border border-green-600",
        "IN PROGRESS": "bg-yellow-400 text-yellow-900 shadow-sm border border-yellow-500",
        "PENDING": "bg-gray-500 text-white shadow-sm border border-gray-600",
        "DUE": "bg-red-500 text-white shadow-sm border border-red-600"
    }

    const currentStatusStyle = statusStyles[status] || "bg-gray-500 text-white";

    return (
        // am adăugat w-full și text-center
        <span className={`w-full block text-center px-2.5 py-1.5 rounded-md text-xs font-black tracking-wider uppercase ${currentStatusStyle} ${className}`}>
            {status}
        </span>
    );
}

export default StatusBadge;