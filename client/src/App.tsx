import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import type { IUser } from "@types";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { lazy, Suspense } from "react";

const RootLayout = lazy(() => import("./app/root/layout"));
const Home = lazy(() => import("./app/root/pages/home"));
const Messaging = lazy(() => import("./app/root/pages/messaging"));
const Jobs = lazy(() => import("./app/root/pages/jobs"));
const Networks = lazy(() => import("./app/root/pages/networks"));
const Notifications = lazy(() => import("./app/root/pages/notifications"));
const CreatePost = lazy(() => import("./app/root/pages/create-post"));
const Profile = lazy(() => import("./app/root/pages/profile"));
const EmailVerification = lazy(
  () => import("./app/root/pages/email-verification")
);

const AuthLayout = lazy(() => import("./app/auth/layout"));
const SignIn = lazy(() => import("./app/auth/pages/sign-in"));
const SignUp = lazy(() => import("./app/auth/pages/sign-up"));
const ResetPassword = lazy(() => import("./app/auth/pages/reset-password"));

function App() {
  const { setUser, user } = useAuthStore();

  const { data: userData, status: userStatus } = useQuery<
    unknown,
    AxiosError,
    IUser,
    string[]
  >({
    queryKey: ["user"],
    queryFn: async () => {
      const { default: axiosInstance } = await import("@/lib/axiosInstance");
      const res = await axiosInstance.get("/auth/user");
      return res.data;
    },
  });

  useEffect(() => {
    if (userStatus === "error") {
      setUser(null);
      return;
    }
    if (userStatus === "success" && userData) setUser(userData);
  }, [userStatus, userData]);
  cookieStore.getAll().then((cookies) => console.log(cookies));
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route element={user ? <Navigate to={"/"} /> : <AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route
          path="/reset-password"
          element={user ? <Navigate to={"/"} /> : <ResetPassword />}
        />
        <Route element={user ? <RootLayout /> : <Navigate to={"/sign-in"} />}>
          <Route index element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/network" element={<Networks />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/in/:uid" element={<Profile />} />
        </Route>
        <Route
          path="/email-verification"
          element={user ? <EmailVerification /> : <Navigate to={"/sign-in"} />}
        />
      </Routes>
      <Toaster />
    </Suspense>
  );
}
export default App;
