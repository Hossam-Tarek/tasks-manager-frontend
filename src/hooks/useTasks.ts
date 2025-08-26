"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { Task } from "@/types/task";

interface PaginatedTasks {
    tasks: Task[];
    per_page: number;
    total: number;
    current_page: number;
}

export default function useTasks(initialPage = 1) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(initialPage);
    const [pagination, setPagination] = useState<PaginatedTasks>({
        tasks: [],
        per_page: 10,
        total: 0,
        current_page: 1,
    });

    const fetchTasks = async (pageNumber: number = 1) => {
        setLoading(true);
        try {
            const res = await api.get(`/tasks?page=${pageNumber}`);
            setTasks(res.data.data.tasks);
            setPagination(res.data.data);
            setPage(res.data.data.current_page);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(page);
    }, [page]);

    return { tasks, loading, fetchTasks, page, setPage, pagination };
}
