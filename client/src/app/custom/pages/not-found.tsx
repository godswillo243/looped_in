import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="w-screen h-dvh flex items-center justify-center">
      <Empty className="">
        <EmptyContent>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist.
          </EmptyDescription>
          <Link to={"/"}>
            <Button variant={"ghost"}>Go home</Button>
          </Link>
        </EmptyContent>
      </Empty>
    </main>
  );
}
export default NotFound;
