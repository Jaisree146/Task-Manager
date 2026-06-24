import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import taskApi from "../services/taskapi";
import { fetchTasks } from "../services/taskService";
import { type Task } from "../types/task";
import { useAuth } from "../contexts/authContext";

function Tasks() {
  const { token } = useAuth();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", token],
    queryFn: () => fetchTasks(token!),
    enabled: !!token,
  });

  const addTaskMutation = useMutation({
    mutationFn: async () => {
      return taskApi.post(
        "/tasks",
        {
          task,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onSuccess: () => {
      setTask("");
      setDescription("");

      queryClient.invalidateQueries({
        queryKey: ["tasks", token],
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async () => {
      return taskApi.put(
        `/tasks/${editingId}`,
        {
          task,
          description,
          completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onSuccess: () => {
      setEditingId(null);
      setTask("");
      setDescription("");
      setCompleted(false);

      queryClient.invalidateQueries({
        queryKey: ["tasks", token],
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) => {
      return taskApi.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", token],
      });
    },
  });

  function addTask() {
    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    addTaskMutation.mutate();
  }

  function updateTask() {
    if (editingId === null) return;

    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    updateTaskMutation.mutate();
  }

  function deleteTask(id: number) {
    deleteTaskMutation.mutate(id);
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <h2>Loading Tasks...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2>Failed to load tasks.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Form Section */}
      <div className="mb-8 rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Task Manager
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) =>
                setCompleted(e.target.checked)
              }
            />
            Completed
          </label>

          <div className="flex gap-3">
            <button
              disabled={
                addTaskMutation.isPending ||
                updateTaskMutation.isPending
              }
              onClick={
                editingId !== null
                  ? updateTask
                  : addTask
              }
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {editingId !== null
                ? "Update Task"
                : "Add Task"}
            </button>

            {editingId !== null && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setTask("");
                  setDescription("");
                  setCompleted(false);
                }}
                className="rounded-lg bg-gray-500 px-5 py-2 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <div className="rounded-xl bg-white p-6 shadow">
          <p>No Tasks Found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task: Task) => (
            <div
              key={task.id}
              className="rounded-xl bg-white p-5 shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    {task.task}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {task.description}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    task.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.completed
                    ? "Completed"
                    : "Pending"}
                </span>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setEditingId(task.id);
                    setTask(task.task);
                    setDescription(task.description);
                    setCompleted(task.completed);
                  }}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  disabled={
                    deleteTaskMutation.isPending
                  }
                  onClick={() =>
                    deleteTask(task.id)
                  }
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;