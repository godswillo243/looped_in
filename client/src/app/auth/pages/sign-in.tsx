import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import axiosInstance from "@/lib/axiosInstance";

interface SignInFormValues {
  email: string;
  password: string;
}

function SignIn() {
  const defaultValues: SignInFormValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues,
    mode: "onBlur",
  });

  const [serverError, setServerError] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutate: signUp, status } = useMutation<
    string,
    AxiosError<Record<string, string>, SignInFormValues>,
    SignInFormValues,
    unknown
  >({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/sign-in", data);
      return res.data;
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      signUp(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (err) => {
          setServerError(err.response?.data.message || "");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        className={cn("flex flex-col gap-4 w-full max-w-sm p-8")}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup className="gap-4">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <InputField
            label="Email"
            name="email"
            register={register}
            error={errors.email}
            validation={{
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            type="email"
          />
          <InputField
            label="Password"
            name="password"
            register={register}
            error={errors.password}
            validation={{
              required: { value: true, message: "Password is required" },

              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            type="password"
          />
          <Field>
            <FieldDescription className="text-right">
              <Link
                to="/reset-password"
                className="underline underline-offset-4"
              >
                Forgot password
              </Link>
            </FieldDescription>
          </Field>
          <Field>
            <Button
              type="submit"
              className="font-semibold"
              disabled={status === "pending"}
            >
              {status === "pending" ? <Spinner /> : "Sign in"}
            </Button>
          </Field>
          {serverError && (
            <p className="text-destructive text-sm text-center">
              {serverError}
            </p>
          )}
          <Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
export default SignIn;
