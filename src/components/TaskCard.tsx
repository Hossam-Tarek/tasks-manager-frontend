"use client";

import { STATUS_LABELS } from "@/constants/status";

interface TaskCardProps {
    task: {
        id: number;
        title: string;
        description: string;
        status: number;
    };
}

export default function TaskCard({ task }: TaskCardProps) {
    const statusColors: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-800 border-yellow-400",
        "In Progress": "bg-blue-100 text-blue-800 border-blue-400",
        Done: "bg-green-100 text-green-800 border-green-400",
    };

    const statusLabel = STATUS_LABELS[task.status] || "Unknown";

    return (
        <div
            className={`p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow transform hover:-translate-y-1`}
        >
            <div
                className={`h-1 w-full rounded-t-lg ${
                    statusColors[statusLabel]?.split(" ")[2] || "bg-gray-300"
                } mb-3`}
            />

            <h2 className="font-semibold text-lg text-gray-900 mb-2">{task.title}</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>

            <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    statusColors[statusLabel] || "bg-gray-100 text-gray-800"
                }`}
            >
        {statusLabel}
      </span>
        </div>
    );
}
