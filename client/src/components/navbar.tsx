import { Link } from "react-router-dom";
import Navlist from "./navlist";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Icon from "./icon";
import { ICON_PATHS } from "@/lib/icons";
import SignOutBtn from "./sign-out-btn";
import { useAuthStore } from "@/store/auth-store";

function Navbar() {
  const user = useAuthStore((state) => state.user!);

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <nav className="flex w-[98%] items-center justify-between absolute top-0 z-10 p-2 py-2 gap-4">
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
        to={"/create"}
        className="flex items-center justify-center gap-1 p-1.5 px-2 bg-accent/50 rounded-full"
      >
        <Icon paths={ICON_PATHS.plus} className="size-6 shrink-0" />
        <p className="text-sm">Create</p>
      </Link>
      <Link
        to={"/search"}
        className="flex items-center justify-center gap-1 p-2 bg-accent/50 rounded-full"
      >
        <Icon paths={ICON_PATHS.search} className="size-4" />
        <p className="text-sm">Search</p>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="size-8">
            <AvatarImage
              src={user?.profilePictureUrl}
              alt="profile"
              className="object-cover!"
            />
            <AvatarFallback className="font-black text-xl">
              {fullName[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-2 p-4">
          <Link
            to={`/in/${user.uid}`}
            className="flex gap-2 hover:bg-accent/50 p-2 px-4 rounded-md "
          >
            <Avatar className="size-6">
              <AvatarImage src="" alt="profile" />
              <AvatarFallback className="font-black text-xl">
                {fullName[0]}
              </AvatarFallback>
            </Avatar>
            <p>{fullName}</p>
          </Link>
          <SignOutBtn />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
export default Navbar;
