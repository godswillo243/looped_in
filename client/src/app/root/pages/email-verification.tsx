import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import useCountDown from "@/hooks/useCountDown";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";

function EmailVerification() {
  const COUNT_KEY = "verification-countdown";
  const [count, _, resetCount] = useCountDown(60, 0, 1, COUNT_KEY);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const { mutate: verifyEmail, isPending: isVerifyPending } = useMutation<
    string,
    AxiosError<Record<string, string>, string>,
    string,
    unknown
  >({
    mutationFn: async (code) => {
      const res = await axiosInstance.post("/auth/verify-email", { code });
      return res.data;
    },
  });
  const { mutate: resendEmail, isPending: isResendPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.get("/auth/resend-verification-email");
      return res.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) return setError("Please enter OTP!");
    if (otp.length !== 6) return setError("Please enter a valid OTP!");
    setError("");
    verifyEmail(otp, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (e) => {
        console.log(e);
        setError(e.response?.data?.message || "Something went wrong!");
      },
    });
  };
  const handleResend = () => {
    resendEmail(undefined, {
      onSuccess: () => {
        resetCount();
      },
      onError: (e) => {
        console.log(e);
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
        className="max-w-4xs flex flex-col items-center justify-center gap-2 p-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold text-center">Verify your email</h3>
        <p className="text-foreground/60">
          We have sent a verification code to your email inbox
        </p>
        <FieldGroup>
          <Field className="gap-2">
            <FieldLabel htmlFor="email" className="text-base">
              Verification code
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
                      className="rounded-none! border-1 size-12 max-sm:size-10 text-xl"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription className="text-destructive">
                {error}
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field className="">
            <Button type="submit" disabled={isVerifyPending}>
              Submit
            </Button>
            <Button
              variant={"outline"}
              type="button"
              disabled={count > 0 || isResendPending}
              onClick={() => handleResend()}
            >
              {isResendPending ? (
                <Spinner />
              ) : (
                <>Resend code {count > 0 && <>({count})s</>}</>
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </main>
  );
}
export default EmailVerification;
