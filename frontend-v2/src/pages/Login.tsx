import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import authapi from "../services/authapi";
import { useAuth } from "../contexts/authContext";
import { loginSchema, type LoginForm } from "../schemas/loginSchema";
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  async function onSubmit(data: LoginForm) {
    try {
      const response = await authapi.post("/login", {
        email: data.email,
        password: data.password,
      });
      const accessToken = response.data.accessToken;

      const profileResponse = await authapi.get("/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const roleId = profileResponse.data.roleId;

      login(accessToken, roleId);

      localStorage.setItem("refreshToken", response.data.refreshToken);

      alert("Login Successful");

      if (roleId === 1) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      alert(err.response?.data?.error || "Login Failed");
    }
  }

  return (
    <section className="bg-gray-1 min-h-screen py-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-[500px]">
            <div className="rounded-lg bg-white px-10 py-12 shadow-md">
              <div className="mb-10 text-center">
                <h1 className="mb-2 text-3xl font-bold text-black">Sign In</h1>

                <p className="text-base text-gray-600">
                  Login to your Task Manager account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-black">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="w-full rounded-md border border-gray-300 px-5 py-3 outline-none focus:border-blue-500"
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-black">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className="w-full rounded-md border border-gray-300 px-5 py-3 outline-none focus:border-blue-500"
                  />

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 py-3 text-white font-medium hover:bg-blue-700"
                >
                  Sign In
                </button>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/register")}
                      className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Register
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
