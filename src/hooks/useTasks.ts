"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { Task } from "@/types/task";

export default function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data.data.tasks);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasks, loading, fetchTasks };
}
