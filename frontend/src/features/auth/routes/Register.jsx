import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import registerSchema from "../schema/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../api/register";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: signUp, isPending: isSigning } = useRegister();

  const onSubmit = handleSubmit((data) => {
    signUp(data, {
      onSuccess: () => {
        toast.success("Registering success");
        navigate("/home");
      },
      onError: (error) => {
        toast.error("Registering fail!" + error.message);
      },
    });
  });

  return (
    <Card className="w-[450px] m-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="mx-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 my-2">
              <Label htmlFor="name" className="me-auto ms-3">
                Name
              </Label>
              <Input
                type="text"
                placeholder="Your name"
                className="rounded-full p-3 bg-slate-100 focus:ring-0"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 me-auto text-sm ms-4">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 my-2">
              <Label htmlFor="name" className="me-auto ms-3">
                Email
              </Label>
              <Input
                type="text"
                {...register("email")}
                placeholder="example@gmail.com"
                className="rounded-full p-3 bg-slate-100 focus:ring-0"
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
                {...register("password")}
                placeholder="Enter at least 8 characters"
                className="rounded-full p-3 bg-slate-100 focus:ring-0"
              />
              {errors.password && (
                <p className="text-red-500 me-auto text-sm ms-4">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 my-2">
              <Label htmlFor="name" className="me-auto ms-3">
                Password Confirm
              </Label>
              <Input
                type="password"
                {...register("passwordConfirm")}
                placeholder="Confirm your password again"
                className="rounded-full p-3 bg-slate-100 focus:ring-0"
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 me-auto text-sm ms-4">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 my-2">
              <Button
                type="submit"
                className="w-full rounded-full bg-cyan-500 text-white hover:bg-cyan-400 hover:text-white"
              >
                {isSigning ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm mb-4">
        <p>Been Here Before?</p>
        <Link to="/login" className=" text-cyan-500 hover:text-cyan-600">
          Log In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Register;
