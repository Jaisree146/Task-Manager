import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authapi from "../services/authapi";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterForm } from "../schemas/registerSchema";
function Register(){
  const navigate=useNavigate();
  const{
    register,
    handleSubmit,
    formState:{errors},
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
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
    <section className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mb-4 text-5xl">📝</div>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>

            <p className="mt-2 text-gray-500">
              Register to access Task Manager
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Register;
