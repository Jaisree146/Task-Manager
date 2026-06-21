import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authapi from "../services/authapi";

type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const { register,handleSubmit}=useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    try {
      const response = await authapi.post("/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.error || "Login Failed");
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
        }}
      >
        <h2>Login</h2>

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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;