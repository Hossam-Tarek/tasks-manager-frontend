"use client";

import { useState } from "react";
import api from "@/services/api";
import { STATUS_LABELS } from "@/constants/status";

interface AddTaskFormProps {
    onSuccess?: () => void; // callback to refresh tasks and close modal
    onNotification?: (msg: string) => void; // show toast
}

export default function AddTaskForm({ onSuccess, onNotification }: AddTaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            await api.post("/tasks", { title, description, status });

            // Reset form
            setTitle("");
            setDescription("");
            setStatus(0);

            // Show notification
            if (onNotification) onNotification("Task added successfully!");

            // Close modal and refresh tasks
            if (onSuccess) onSuccess();
        } catch (err: any) {
            if (err.response?.status === 422) {
                // Validation errors
                setErrors(err.response.data.errors || {});
            } else {
                setErrors({ general: "Something went wrong. Please try again." });
            }
        }
    };

    return (
        <div>
            {errors.general && (
                <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{errors.general}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        className="w-full border rounded p-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                        <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        className="w-full border rounded p-2"
                        value={status}
                        onChange={(e) => setStatus(Number(e.target.value))}
                    >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
}
