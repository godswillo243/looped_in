import { Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";

const RootLayout = lazy(() => import("./app/root/layout"));
const Home = lazy(() => import("./app/root/pages/home"));
const Messaging = lazy(() => import("./app/root/pages/messaging"));
const Jobs = lazy(() => import("./app/root/pages/jobs"));
const Networks = lazy(() => import("./app/root/pages/networks"));
const Notifications = lazy(() => import("./app/root/pages/notifications"));
const CreatePost = lazy(() => import("./app/root/pages/create-post"));
const Profile = lazy(() => import("./app/root/pages/profile"));
const AuthLayout = lazy(() => import("./app/auth/layout"));
const SignIn = lazy(() => import("./app/auth/pages/sign-in"));
const SignUp = lazy(() => import("./app/auth/pages/sign-up"));

function App() {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/network" element={<Networks />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/in/:uid" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default App;
