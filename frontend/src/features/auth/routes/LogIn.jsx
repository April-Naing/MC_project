import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logInSchema from "../schema/log-in-schema";
import { useLogin } from "../api/log-in";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(logInSchema),
  });

  const { mutate: login, isPending: isLogging } = useLogin();

  const onSubmit = handleSubmit((data) => {
    login(data, {
      onSuccess: () => {
        toast.success("Log in successful.");
        navigate("/protect");
      },
      onError: (error) => {
        toast.error("Log in fail." + error.response?.data.message);
      },
    });
  });

  return (
    <div className="m-4">
      <div className="flex justify-end">
        <p>
          Do not have an account?
          <Link to="/" className=" text-cyan-500">
            Register Now
          </Link>
        </p>
      </div>
      <div className="w-1/2 m-auto">
        <div className="p-8">
          <h1 className="text-3xl text-center">Welcome Back</h1>
          <p className=" text-slate-400 text-center">
            Enter your details to get sign in to your account.
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="grid w-3/4 items-center gap-4 mx-auto">
            <div className="flex flex-col space-y-1.5 my-2">
              <Label htmlFor="name" className="me-auto ms-3">
                Email
              </Label>
              <Input
                type="text"
                placeholder="example@gmail.com"
                className="rounded-full p-3 bg-slate-100 focus:ring-0"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 me-auto text-sm ms-4">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 my-2">
              <Label htmlFor="name" className="me-auto ms-3">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="rounded-full p-3 bg-slate-100 focus:ring-0"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 me-auto text-sm ms-4">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              variant="outline"
              className="w-full rounded-full my-4 bg-cyan-500 text-white hover:bg-cyan-400 hover:text-white"
            >
              {isLogging ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
