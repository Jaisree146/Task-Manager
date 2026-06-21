import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authapi from "../services/authapi";
type RegisterForm = {
  name: string;
  email: string;
  password: string;
};
function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterForm>();
  async function onSubmit(data: RegisterForm) {
    try {
      await authapi.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      alert("Registration Successful");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.error || "Registration Failed");
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "15px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          {...register("name")}
        />

        <input
          type="email"
          placeholder="Enter Email"
          {...register("email")}
        />

        <input
          type="password"
          placeholder="Enter Password"
          {...register("password")}
        />

        <button type="submit">
          Register
        </button>

        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;