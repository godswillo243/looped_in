import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="grid grid-cols-2 max-sm:grid-cols-1 p-2 w-screen h-dvh relative overflow-y-auto">
      <img
        src="/images/pattern.webp"
        className="absolute w-full h-full border-0 -z-10"
      />
      <section className="">
        <p className="text-primary font-bold text-2xl flex items-center p-2">
          Looped
          <span className="bg-primary text-secondary rounded-xs text-center size-8">
            in
          </span>
        </p>
      </section>
      <section className="w-full h-full flex items-center justify-center">
        <Outlet />
      </section>
    </main>
  );
}
export default Layout;
