import { Link } from "react-router-dom";
import Navlist from "./navlist";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Icon from "./icon";
import { ICON_PATHS } from "@/lib/icons";

function Navbar() {
  const user = {
    id: "001",
    name: "Godswill Ogbodu",
  };

  return (
    <nav className="flex w-[98%] items-center justify-between absolute top-0 z-10 px-4 py-2 gap-6">
      <Link to={"/"} className="mr-auto">
        <p className="text-primary font-bold text-2xl flex items-center">
          Looped
          <span className="bg-primary text-secondary rounded-xs text-center size-8">
            in
          </span>
        </p>
      </Link>
      <div className="flex-1 flex items-center justify-center max-md:hidden">
        <Navlist />
      </div>
      <Link
        to={"/search"}
        className="flex items-center justify-center gap-1 p-2 bg-accent/50 rounded-full"
      >
        <Icon paths={ICON_PATHS.search} className="size-4" />
        <p className="text-xs">Search</p>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="size-8">
            <AvatarImage src="" alt="profile" />
            <AvatarFallback className="font-black text-xl">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-2 p-4">
          <Link
            to={`/in/${user.id}`}
            className="flex gap-2 hover:bg-accent/50 p-2 px-4 rounded-md "
          >
            <Avatar className="size-6">
              <AvatarImage src="" alt="profile" />
              <AvatarFallback className="font-black text-xl">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <p>{user.name}</p>
          </Link>
          <Button variant={"outline"}>Sign Out</Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
export default Navbar;
