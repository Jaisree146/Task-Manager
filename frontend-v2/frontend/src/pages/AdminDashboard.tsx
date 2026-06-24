import { useQuery } from "@tanstack/react-query";
import authapi from "../services/authapi";
import { useAuth } from "../contexts/authContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
type User = {
  id: number;
  name: string;
  email: string;
};

function AdminDashboard() {
  const { token } = useAuth();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await authapi.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });

  if (isLoading) {
    return <h2 className="p-6">Loading users...</h2>;
  }

  if (error) {
    return <h2 className="p-6">Failed to load users</h2>;
  }
const barData = {
  labels: ["Users"],
  datasets: [
    {
      label: "Total Users",
      data: [users.length],
      backgroundColor: "#3B82F6",
    },
  ],
};
const lineData = {
  labels: users.map((user) => user.name),
  datasets: [
    {
      label: "User IDs",
      data: users.map((user) => user.id),
      borderColor: "#10B981",
      backgroundColor: "#10B981",
      tension: 0.4,
    },
  ],
};
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Heading */}
      <h1 className="mb-8 text-3xl font-bold text-black">Admin Dashboard</h1>

      {/* TailGrids Style Stats Card */}
      <div className="mb-8">
        <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
            👥
          </div>

          <div className="mt-4">
            <h4 className="text-3xl font-bold text-black">{users.length}</h4>

            <span className="text-sm font-medium text-gray-500">
              Total Users
            </span>
          </div>
        </div>
      </div>
<div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
  <div className="rounded-sm border border-gray-200 bg-white p-6 shadow">
    <h3 className="mb-4 text-lg font-semibold">
      Total Users
    </h3>

    <Bar data={barData} />
  </div>

  <div className="rounded-sm border border-gray-200 bg-white p-6 shadow">
    <h3 className="mb-4 text-lg font-semibold">
      User Distribution
    </h3>

    <Line data={lineData} />
  </div>
</div>
      <div className="rounded-sm border border-stroke bg-white shadow">
        <div className="border-b px-6 py-4">
          <h3 className="text-xl font-semibold text-black">Registered Users</h3>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left">
                <th className="px-6 py-4 font-medium text-black">ID</th>

                <th className="px-6 py-4 font-medium text-black">Name</th>

                <th className="px-6 py-4 font-medium text-black">Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-4">{user.id}</td>

                  <td className="px-6 py-4">{user.name}</td>

                  <td className="px-6 py-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
