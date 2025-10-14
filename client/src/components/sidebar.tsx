import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardTitle } from "./ui/card";

function Sidebar() {
  return (
    <aside className="w-full h-full sticky top-0 flex flex-col gap-2 p-4">
      <Card className="p-4">
        <Link to={"/in/001"}>
          <Avatar className="size-16">
            <AvatarImage src="us" />
            <AvatarFallback className="font-black text-3xl">G</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl tracking-wide">
            Godswill Ogbodu
          </CardTitle>
        </Link>
      </Card>
    </aside>
  );
}
export default Sidebar;
