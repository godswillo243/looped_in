import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import Icon from "./icon";

function Navlist() {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <ul className="flex gap-4 max-sm:gap-1 items-center flex-1 max-w-md justify-center bg-background">
      {NAV_ITEMS.map(({ href, label, iconPaths }) => (
        <li key={label + href} className="flex-1">
          <Link
            to={href}
            className={cn(
              "capitalize opacity-60 hover:opacity-100 text-sm w-16 max-sm:w-12",
              "flex flex-col  items-center justify-center  ",
              isActive(href) && "font-medium opacity-100"
            )}
          >
            <Icon paths={iconPaths ? iconPaths : []} className="size-5" />
            <span className="max-md:text-[10px]">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default Navlist;
