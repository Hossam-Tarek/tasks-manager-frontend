"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import useTasks from "@/hooks/useTasks";
import TaskCard from "@/components/TaskCard";
import AddTaskForm from "@/components/AddTaskForm";

export default function HomePage() {
    const { tasks, loading, fetchTasks, page, setPage, pagination } = useTasks();
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState("");

    const handleNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(""), 3000);
    };

    if (loading) return <div>Loading tasks...</div>;

    const totalPages = Math.ceil(pagination.total / pagination.per_page);

    return (
        <div className="p-6 space-y-6">
            {/* Add Task Button */}
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                + Add New Task
            </button>

            {/* Notification */}
            {notification && (
                <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
                    {notification}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>

                        <AddTaskForm
                            onSuccess={() => {
                                fetchTasks(page); // refresh current page
                                setShowModal(false); // close modal
                                handleNotification("Task added successfully!");
                            }}
                            onNotification={handleNotification}
                        />
                    </div>
                </div>
            )}

            {/* Tasks Grid */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task: Task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(page - 1)}
                        className={`px-3 py-1 rounded border ${
                            page <= 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        Previous
                    </button>

                    <span className="px-3 py-1 border rounded bg-white">
            Page {page} of {totalPages}
          </span>

                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(page + 1)}
                        className={`px-3 py-1 rounded border ${
                            page >= totalPages
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
