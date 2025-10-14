import Navbar from "@/components/navbar";
import Navlist from "@/components/navlist";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="relative max-w-screen h-dvh p-2 pt-16 overflow-auto">
      <Navbar />

      <Outlet />
      {/* <RightSidebar /> */}

      {/* Bottom bar */}
      <div className="fixed bottom-0 w-full flex items-center justify-center md:hidden pb-2 bg-background">
        <Navlist />
      </div>
    </main>
  );
}
export default Layout;
