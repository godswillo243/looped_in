import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface SignInFormValues {
  email: string;
  password: string;
}

function SignIn() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        className={cn("flex flex-col gap-6 w-full max-w-sm")}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup>
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
            <Button type="submit">Login</Button>
          </Field>
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
