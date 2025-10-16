import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import useCountDown from "@/hooks/useCountDown";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function EmailVerification() {
  const COUNT_KEY = "password-countdown";
  const [count, _, resetCount] = useCountDown(60, 0, 1, COUNT_KEY);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending: isVerifyPending } = useMutation<
    string,
    AxiosError<Record<string, string>, string>,
    Record<string, string>,
    unknown
  >({
    mutationFn: async ({ otp: code, email, password }) => {
      const res = await axiosInstance.post(
        "/auth/reset-password",
        { code, password },
        { params: { email } }
      );
      return res.data;
    },
  });
  const { mutate: resendEmail, isPending: isResendPending } = useMutation<
    string,
    AxiosError<Record<string, string>, string>,
    string,
    unknown
  >({
    mutationFn: async (email: string) => {
      const res = await axiosInstance.get("/auth/resend-password-email", {
        params: { email },
      });
      return res.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) return setError("Please enter OTP!");
    if (otp.length !== 6) return setError("Please enter a valid OTP!");
    setError("");
    resetPassword(
      { otp, email, password },
      {
        onSuccess: () => {
          navigate("/sign-in");
        },
        onError: (e) => {
          console.log(e);
          setError(e.response?.data?.message || "Something went wrong!");
        },
      }
    );
  };
  const handleResend = () => {
    resendEmail(email, {
      onSuccess: () => {
        resetCount();
        toast.success("Verification code resent!");
      },
      onError: (e) => {
        setError(e.response?.data?.message || "Something went wrong!");
      },
    });
  };

  return (
    <main className=" w-screen h-dvh flex flex-col items-center ">
      <header className="w-full p-4">
        <p className="text-primary font-bold text-2xl flex items-center p-2">
          Looped
          <span className="bg-primary text-secondary rounded-xs text-center size-8">
            in
          </span>
        </p>
      </header>
      <form
        action=""
        className="max-w-[320px] w-full flex flex-col items-center justify-center gap-2 p-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold text-center">Reset your password</h3>

        <FieldGroup className="w-full *:w-full">
          <Field className="mt-6 w-full">
            <FieldLabel>Your Email</FieldLabel>
            <Input onChange={(e) => setEmail(e.target.value)} value={email} />
          </Field>
          <Field>
            <Button
              variant={"outline"}
              type="button"
              disabled={count > 0 || isResendPending}
              onClick={() => handleResend()}
            >
              {isResendPending ? (
                <Spinner />
              ) : (
                <>Send code {count > 0 && <>({count})s</>}</>
              )}
            </Button>
          </Field>{" "}
          <Field className="gap-2">
            <FieldLabel htmlFor="email" className="text-base">
              Reset password code
            </FieldLabel>
            <FieldContent className="flex items-center justify-center ">
              <InputOTP
                maxLength={6}
                pattern={"^[0-9]+$"}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="rounded-none p-2 gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      index={index}
                      key={index}
                      className="rounded-none! border-1 size-10 max-sm:size-10 text-xl"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription className="text-destructive">
                {error}
              </FieldDescription>
            </FieldContent>

            <Field className="mt-6">
              <FieldLabel>New password</FieldLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Field>
          </Field>
          <Field className="">
            <Button type="submit" disabled={isVerifyPending}>
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </main>
  );
}
export default EmailVerification;
