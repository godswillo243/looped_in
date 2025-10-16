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

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function SignUp() {
  const defaultValues: SignUpFormValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }),
    []
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues,
    mode: "onBlur",
  });
  const [serverError, setServerError] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutate: signUp, status } = useMutation<
    string,
    AxiosError<Record<string, string>, SignUpFormValues>,
    SignUpFormValues,
    unknown
  >({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/sign-up", data);
      return res.data;
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
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
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground text-sm text-balance"></p>
          </div>
          <InputField
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
            validation={{
              required: { value: true, message: "First Name is required" },
              pattern: {
                value: /^[a-zA-Z]+$/i,
                message: "Only alphabets are allowed",
              },
              min: {
                value: 2,
                message: "First Name must be at least 2 characters",
              },
            }}
            type="firstName"
          />
          <InputField
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
            validation={{
              required: { value: true, message: "Last Name is required" },
              pattern: {
                value: /^[a-zA-Z]+$/i,
                message: "Only alphabets are allowed",
              },
              min: {
                value: 2,
                message: "Last Name must be at least 2 characters",
              },
            }}
            type="lastName"
          />

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
            isPassword
          />

          <Field>
            <Button
              type="submit"
              className="font-semibold"
              disabled={status === "pending"}
            >
              {status === "pending" ? <Spinner /> : "Create account"}
            </Button>
          </Field>
          {serverError && (
            <p className="text-destructive text-sm text-center">
              {serverError}
            </p>
          )}
          <Field>
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
export default SignUp;
