import Navbar from "@/components/navbar";
import Navlist from "@/components/navlist";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";

import { Navigate, Outlet } from "react-router-dom";

function Layout() {
  const user = useAuthStore().user!;

  useQuery({
    queryKey: [user.uid + "connections"],
    queryFn: async () => {
      const { default: axiosInstance } = await import("@/lib/axiosInstance");
      const res = await axiosInstance.get(`/users/${user.uid}/connections`);
      return res.data;
    },
  });

  const isEmailVerified = user.emailVerification.done;
  if (!isEmailVerified) return <Navigate to={"/email-verification"} />;

  return (
    <main className="relative min-w-screen min-h-dvh h-dvh pt-16 max-md:pb-13 overflow-auto grid grid-cols-[0.5fr_768px_0.5fr] max-md:grid-cols-[1fr]">
      <Navbar />

      <div className="max-md:hidden "></div>

      <Outlet />

      <div className="max-md:hidden "></div>
      <div
        className={cn(
          "fixed bottom-0 w-full",
          "flex items-center justify-center",
          "md:hidden py-2 bg-background"
        )}
      >
        <Navlist />
      </div>
    </main>
  );
}
export default Layout;
