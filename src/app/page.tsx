"use client";

import { Task } from "@/types/task";
import useTasks from "@/hooks/useTasks";
import TaskCard from "@/components/TaskCard";


export default function HomePage() {
    const { tasks, loading } = useTasks();

    if (loading) return <div>Loading tasks...</div>;
    if (!tasks.length) return <div>No tasks yet.</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Tasks</h1>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task: Task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}
