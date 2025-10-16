import Navbar from "@/components/navbar";
import Navlist from "@/components/navlist";
import { cn } from "@/lib/utils";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="relative max-w-screen h-dvh p-2 pt-16 overflow-auto grid grid-cols-[0.1fr_1fr_0.1fr] max-md:grid-cols-1">
      <Navbar />

      <div className="bg-primary/10 max-md:hidden "></div>

      <Outlet />

      <div className="bg-primary/10 max-md:hidden "></div>
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
