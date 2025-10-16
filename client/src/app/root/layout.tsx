import Navbar from "@/components/navbar";
import Navlist from "@/components/navlist";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

import { Navigate, Outlet } from "react-router-dom";

function Layout() {
  const user = useAuthStore().user!;

  if (!user.emailVerification.done)
    return <Navigate to={"/email-verification"} />;

  return (
    <main className="relative max-w-screen h-dvh pt-16 overflow-auto grid grid-cols-[0.5fr_768px_0.5fr] max-md:grid-cols-[1fr]">
      <Navbar />

      <div className="max-md:hidden "></div>

      <Outlet />

      <div className="max-md:hidden "></div>
      <div
        className={cn(
          "fixed bottom-0 w-full",
          "flex items-center justify-center",
          "md:hidden pb-2 bg-background"
        )}
      >
        <Navlist />
      </div>
    </main>
  );
}
export default Layout;
