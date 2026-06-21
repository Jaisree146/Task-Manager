import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#1976d2",
        color: "white",
      }}
    >
      <h2>Task Manager</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}>
        <Link
          to="/dashboard"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>

        <Link to="/tasks" style={{ color: "white", textDecoration: "none" }}>
          Tasks
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
