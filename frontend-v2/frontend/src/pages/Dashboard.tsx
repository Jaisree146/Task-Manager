import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import authapi from "../services/authapi";
import taskApi from "../services/taskapi";
import { useNavigate } from "react-router-dom";

type User = {
  userId: number;
  email: string;
  roleId: number;
};

type Task = {
  id: number;
  task: string;
  description: string;
  completed: boolean;
};

function Dashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const profileResponse = await authapi.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const taskResponse = await taskApi.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(profileResponse.data);
      setTasks(taskResponse.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  if (loading) {
    return (
      <div className="p-6">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm text-gray-500">
            Total Tasks
          </h3>

          <p className="mt-2 text-4xl font-bold">
            {totalTasks}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm text-gray-500">
            Completed Tasks
          </h3>

          <p className="mt-2 text-4xl font-bold text-green-600">
            {completedTasks}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm text-gray-500">
            Pending Tasks
          </h3>

          <p className="mt-2 text-4xl font-bold text-orange-500">
            {pendingTasks}
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          User Profile
        </h2>

        <div className="space-y-3">
          <p>
            <span className="font-semibold">
              User ID:
            </span>{" "}
            {user?.userId}
          </p>

          <p>
            <span className="font-semibold">
              Email:
            </span>{" "}
            {user?.email}
          </p>

          <p>
            <span className="font-semibold">
              Role ID:
            </span>{" "}
            {user?.roleId}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;