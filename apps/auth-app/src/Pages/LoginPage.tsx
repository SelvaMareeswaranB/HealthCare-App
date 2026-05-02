import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button, Toast } from "@repo/ui";

import { login } from "@repo/auth";
import { useState } from "react";

import { useAuthStore } from "@repo/store";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const schema: yup.ObjectSchema<FormData> = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .defined(),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required")
    .defined(),
}).required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
  });


  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "danger" | "warning";
  } | null>(null);


  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const user = await login(data.email, data.password);
      console.log("User:", user);

      const token = await user.getIdToken();
      setAuth(user, token);
      setToast({ message: "Login successful!", variant: "success" });

      setTimeout(() => navigate("/"), 1000);
    } catch (err: any) {
      setToast({ message: err.message, variant: "danger" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-xl">

        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Sign in
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>

        </form>
      </div>
      {toast && (
        <div className="absolute top-5 right-5 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <Toast
            message={toast.message}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Login;