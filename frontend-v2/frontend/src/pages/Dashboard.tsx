import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import authapi from "../services/authapi";
import { useNavigate } from "react-router-dom";
type User = {
  userId: number;
  email: string;
  roleId: number;
};
function Dashboard(){
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const response = await authapi.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } 
    catch (err) {
      alert("Failed to load profile");
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>Dashboard</h1>

      {user ? (
        <>
          <h2>Welcome!</h2>

          <p>
            <strong>User ID:</strong> {user.userId}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role ID:</strong> {user.roleId}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
