import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import taskApi from "../services/taskapi";
import { type Task } from "../types/task";
import { useAuth } from "../contexts/authContext";
function Tasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  useEffect(() => {
    fetchTasks();
  }, []);
  async function fetchTasks() {
    try {
      const response = await taskApi.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function addTask() {
    if (!task) {
      alert("Enter Task");
      return;
    }
    try {
      await taskApi.post(
        "/tasks",
        {
          task,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTask("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteTask(id: number) {
    try {
      await taskApi.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Task Deleted Successfully");

      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to delete task");
    }
  }
  async function updateTask() {
    try {
      await taskApi.put(
        `/tasks/${editingId}`,
        {
          task,
          description,
          completed: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Task Updated Successfully");

      setEditingId(null);
      setTask("");
      setDescription("");

      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to update task");
    }
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Task Manager</h1>

        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <button onClick={editingId !== null ? updateTask : addTask}>
          {editingId !== null ? "Update Task" : "Add Task"}
        </button>

        <hr />

        {tasks.length === 0 ? (
          <p>No Tasks Found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{task.task}</h3>

              <p>{task.description}</p>

              <p>
                Status:
                {task.completed ? " Completed" : "Pending"}
              </p>
              <button
                onClick={() => {
                  setEditingId(task.id);
                  setTask(task.task);
                  setDescription(task.description);
                }}
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Tasks;
